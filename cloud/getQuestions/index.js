const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

exports.main = async (event, context) => {
  const db = cloud.database();
  const _ = db.command;
  const { types, difficulty, count } = event;

  console.log('接收到的参数：', event);

  try {
    // 构建查询条件
    const query = {
      type: _.in(types),
      difficulty: difficulty
    };

    // 获取符合条件的题目总数
    const countResult = await db.collection('questionCollection')
      .where(query)
      .count();

    console.log('符合条件的题目总数：', countResult.total);

    if (countResult.total === 0) {
      return {
        success: false,
        message: '没有找到符合条件的题目',
        data: []
      };
    }

    // 随机获取指定数量的题目
    const questions = await db.collection('questionCollection')
      .where(query)
      .get();

    console.log('获取到的题目：', questions);

    // 随机打乱题目顺序并限制数量
    const shuffledQuestions = questions.data
      .sort(() => Math.random() - 0.5)
      .slice(0, count);

    return {
      success: true,
      data: shuffledQuestions
    };

  } catch (error) {
    console.error('云函数执行错误：', error);
    return {
      success: false,
      message: error.message,
      data: []
    };
  }
};

Page({
  data: {
    questionTypes: ['数据结构与算法', '计算机网络', '操作系统', '计算机组成原理'],
    difficultyLevels: [
      { value: 'easy', label: '简单' },
      { value: 'medium', label: '中等' },
      { value: 'hard', label: '困难' }
    ],
    selectedTypes: [],
    selectedDifficulty: 'easy',
    questionCount: 5,
    questions: [],
    currentQuestion: null,
    currentIndex: 0,
    selectedAnswer: null,
    showAnswer: false,
    correctCount: 0,
    correctRate: 0,
    showResult: false,
    progressPercent: 0,
    completedCount: 0,
  },

  handleTypeChange(e) {
    this.setData({
      selectedTypes: e.detail.value
    });
    console.log('选择的科目：', e.detail.value);
  },

  handleDifficultyChange(e) {
    this.setData({
      selectedDifficulty: e.detail.value
    });
    console.log('选择的难度：', e.detail.value);
  },

  handleCountChange(e) {
    this.setData({
      questionCount: e.detail.value
    });
  },

  async startTest() {
    if (this.data.selectedTypes.length === 0) {
      wx.showToast({
        title: '请至少选择一个科目',
        icon: 'none'
      });
      return;
    }

    wx.showLoading({
      title: '加载题目中...'
    });

    try {
      const { result } = await wx.cloud.callFunction({
        name: 'getQuestions',
        data: {
          types: this.data.selectedTypes,
          difficulty: this.data.selectedDifficulty,
          count: this.data.questionCount
        }
      });

      console.log('云函数返回结果：', result);

      if (!result || !result.data || result.data.length === 0) {
        wx.hideLoading();
        wx.showToast({
          title: '没有找到符合条件的题目',
          icon: 'none'
        });
        return;
      }

      this.setData({
        questions: result.data,
        currentQuestion: result.data[0],
        currentIndex: 0,
        selectedAnswer: null,
        showAnswer: false,
        correctCount: 0,
        correctRate: 0,
        showResult: false,
        progressPercent: 0,
        completedCount: 0
      });

      wx.hideLoading();
    } catch (error) {
      console.error('获取题目失败：', error);
      wx.hideLoading();
      wx.showToast({
        title: '获取题目失败，请重试',
        icon: 'none'
      });
    }
  },

  selectAnswer(e) {
    if (this.data.showAnswer) return;
    const index = e.currentTarget.dataset.index;
    this.setData({
      selectedAnswer: index
    });
  },

  submitAnswer() {
    if (this.data.selectedAnswer === null) {
      wx.showToast({
        title: '请选择一个答案',
        icon: 'none'
      });
      return;
    }

    const isCorrect = this.data.selectedAnswer === this.data.currentQuestion.correctAnswer;
    const newCompletedCount = this.data.completedCount + 1;
    const newProgressPercent = (newCompletedCount / this.data.questions.length) * 100;

    if (isCorrect) {
      this.setData({
        correctCount: this.data.correctCount + 1
      });
    }

    this.setData({
      showAnswer: true,
      completedCount: newCompletedCount,
      progressPercent: newProgressPercent
    });
  },

  nextQuestion() {
    if (this.data.currentIndex === this.data.questions.length - 1) {
      // 最后一题，计算正确率并显示结果
      const rate = (this.data.correctCount / this.data.questions.length * 100).toFixed(1);
      this.setData({
        showResult: true,
        currentQuestion: null,
        correctRate: rate
      });
    } else {
      // 下一题
      this.setData({
        currentIndex: this.data.currentIndex + 1,
        currentQuestion: this.data.questions[this.data.currentIndex + 1],
        selectedAnswer: null,
        showAnswer: false
      });
    }
  },

  restartTest() {
    this.setData({
      currentQuestion: null,
      currentIndex: 0,
      selectedAnswer: null,
      showAnswer: false,
      correctCount: 0,
      correctRate: 0,
      showResult: false,
      questions: [],
      progressPercent: 0,
      completedCount: 0
    });
  },

  onLoad() {
    console.log('页面加载完成');
  },

  async addTestQuestions() {
    console.log('开始添加测试题目');
    
    wx.showLoading({
      title: '添加题目中...',
      mask: true
    });
    
    try {
      console.log('调用云函数');
      const { result } = await wx.cloud.callFunction({
        name: 'addQuestions'
      });
      
      console.log('云函数返回结果：', result);
      
      wx.hideLoading();
      
      if (result.success) {
        wx.showToast({
          title: result.message,
          icon: 'success',
          duration: 2000
        });
      } else {
        wx.showModal({
          title: '添加失败',
          content: result.message || '未知错误',
          showCancel: false
        });
      }
    } catch (error) {
      console.error('添加题目失败：', error);
      wx.hideLoading();
      wx.showModal({
        title: '错误',
        content: '添加题目失败，请重试',
        showCancel: false
      });
    }
  }
});

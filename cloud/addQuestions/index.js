const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

// 示例题目数据
const questionsData = [
  // 数据结构与算法题目
  {
    content: "时间复杂度为O(n log n)的排序算法有哪个？",
    options: ["冒泡排序", "快速排序", "选择排序", "插入排序"],
    type: "数据结构与算法",
    difficulty: "easy",
    correctAnswer: 1,
    explanation: "快速排序的平均时间复杂度为O(n log n)，而冒泡排序、选择排序和插入排序的时间复杂度都是O(n²)。"
  },
  {
    content: "在二叉搜索树中，如何找到最小值？",
    options: ["一直往左子树走", "一直往右子树走", "查找根节点", "遍历整棵树"],
    type: "数据结构与算法",
    difficulty: "easy",
    correctAnswer: 0,
    explanation: "在二叉搜索树中，最小值总是在最左边的叶子节点，因此只需要一直沿着左子树方向走就能找到。"
  },
  {
    content: "队列的特点是什么？",
    options: ["先进后出", "后进先出", "先进先出", "随机存取"],
    type: "数据结构与算法",
    difficulty: "easy",
    correctAnswer: 2,
    explanation: "队列是一种先进先出（FIFO）的数据结构，新元素添加到队尾，从队首移除元素。"
  },
  {
    content: "什么是哈希冲突？",
    options: ["两个不同的键值对应相同的哈希值", "哈希函数计算错误", "内存溢出", "数组越界"],
    type: "数据结构与算法",
    difficulty: "medium",
    correctAnswer: 0,
    explanation: "哈希冲突指的是两个不同的键通过哈希函数计算后得到了相同的哈希值，需要通过链地址法或开放地址法来解决。"
  },
  {
    content: "平衡二叉树AVL树的平衡因子是如何定义的？",
    options: ["左子树深度", "右子树深度", "左右子树深度之和", "左子树深度减右子树深度"],
    type: "数据结构与算法",
    difficulty: "hard",
    correctAnswer: 3,
    explanation: "AVL树的平衡因子定义为左子树的高度减去右子树的高度，其绝对值不能超过1。"
  },

  // 计算机网络题目
  {
    content: "以下哪个协议工作在应用层？",
    options: ["TCP", "IP", "HTTP", "ARP"],
    type: "计算机网络",
    difficulty: "easy",
    correctAnswer: 2,
    explanation: "HTTP（超文本传输协议）是应用层协议，而TCP是传输层协议，IP是网络层协议，ARP是网络接入层协议。"
  },
  {
    content: "DNS服务器的主要功能是什么？",
    options: ["分配IP地址", "域名解析", "路由选择", "数据加密"],
    type: "计算机网络",
    difficulty: "easy",
    correctAnswer: 1,
    explanation: "DNS（域名系统）服务器的主要功能是将域名转换为对应的IP地址，使得用户可以使用易记的域名来访问网站。"
  },
  {
    content: "TCP三次握手中，服务器发送的ACK和SYN包是在第几次握手？",
    options: ["第一次", "第二次", "第三次", "不发送ACK和SYN包"],
    type: "计算机网络",
    difficulty: "medium",
    correctAnswer: 1,
    explanation: "在TCP三次握手的第二次，服务器会发送带有ACK和SYN标志的包作为响应。"
  },
  {
    content: "HTTPS使用的是什么加密方式？",
    options: ["对称加密", "非对称加密", "对称加密和非对称加密的组合", "不使用加密"],
    type: "计算机网络",
    difficulty: "medium",
    correctAnswer: 2,
    explanation: "HTTPS使用混合加密系统，在通信建立初期使用非对称加密交换密钥，之后的通信使用对称加密。"
  },
  {
    content: "关于BGP协议，以下说法正确的是？",
    options: ["是内部网关协议", "只能在同一自治系统内使用", "是外部网关协议", "仅用于局域网"],
    type: "计算机网络",
    difficulty: "hard",
    correctAnswer: 2,
    explanation: "BGP（边界网关协议）是一种外部网关协议，主要用于互联网上不同自治系统之间的路由选择。"
  },

  // 操作系统题目
  {
    content: "以下哪个不是进程的基本状态？",
    options: ["就绪", "运行", "阻塞", "终止"],
    type: "操作系统",
    difficulty: "easy",
    correctAnswer: 3,
    explanation: "进程的三个基本状态是就绪、运行和阻塞（等待），终止是进程的结束状态而非基本状态。"
  },
  {
    content: "页面置换算法中，哪个是最优算法？",
    options: ["FIFO", "LRU", "OPT", "CLOCK"],
    type: "操作系统",
    difficulty: "medium",
    correctAnswer: 2,
    explanation: "OPT（最优置换算法）是理论上最优的页面置换算法，但在实际中难以实现，因为它需要预知未来的页面访问序列。"
  },
  {
    content: "以下哪种调度算法可能会导致进程饥饿？",
    options: ["轮转调度", "先来先服务", "最短作业优先", "均衡调度"],
    type: "操作系统",
    difficulty: "medium",
    correctAnswer: 2,
    explanation: "最短作业优先算法可能会导致长作业一直得不到执行，造成进程饥饿现象。"
  },
  {
    content: "信号量机制主要用于解决什么问题？",
    options: ["内存管理", "进程同步", "文件管理", "设备管理"],
    type: "操作系统",
    difficulty: "medium",
    correctAnswer: 1,
    explanation: "信号量是一种用于进程同步和互斥的机制，可以有效解决进程间的同步与互斥问题。"
  },
  {
    content: "在分段内存管理中，地址空间包含哪两部分？",
    options: ["段号和页号", "段号和位移量", "页号和位移量", "段号和块号"],
    type: "操作系统",
    difficulty: "hard",
    correctAnswer: 1,
    explanation: "在分段内存管理中，地址空间包含段号和段内位移量两部分。"
  },

  // 计算机组成原理题目
  {
    content: "CPU的主要组成部分不包括以下哪个？",
    options: ["运算器", "控制器", "存储器", "寄存器"],
    type: "计算机组成原理",
    difficulty: "easy",
    correctAnswer: 2,
    explanation: "CPU的主要组成部分包括运算器、控制器和寄存器，而存储器是计算机系统的独立部件。"
  },
  {
    content: "以下哪种存储器的访问速度最快？",
    options: ["内存", "硬盘", "寄存器", "光盘"],
    type: "计算机组成原理",
    difficulty: "easy",
    correctAnswer: 2,
    explanation: "在计算机的存储层次结构中，寄存器的访问速度最快，但容量最小。"
  },
  {
    content: "流水线的性能主要受什么因素影响？",
    options: ["时钟频率", "数据相关", "结构相关", "以上都是"],
    type: "计算机组成原理",
    difficulty: "medium",
    correctAnswer: 3,
    explanation: "流水线的性能受多个因素影响，包括时钟频率、数据相关、结构相关和控制相关等。"
  },
  {
    content: "Cache中的写操作策略不包括以下哪个？",
    options: ["写直达", "写回", "写分配", "写预测"],
    type: "计算机组成原理",
    difficulty: "hard",
    correctAnswer: 3,
    explanation: "Cache的写操作策略主要包括写直达、写回、写分配和写不分配，没有写预测这种策略。"
  },
  {
    content: "RISC和CISC的主要区别不包括？",
    options: ["指令数量", "指令长度", "寻址方式", "运行速度"],
    type: "计算机组成原理",
    difficulty: "hard",
    correctAnswer: 3,
    explanation: "RISC和CISC的主要区别在于指令系统的设计理念，包括指令数量、指令长度和寻址方式等，运行速度不是其本质区别。"
  }
];


exports.main = async (event, context) => {
  console.log('开始执行云函数');
  const db = cloud.database();
  const collection = db.collection('questionCollection');
  
  try {
    console.log('准备添加题目，总数：', questionsData.length);
    
    // 由于数据库一次性写入限制，我们需要分批添加
    const batchSize = 20; // 每批处理的数量
    const results = [];
    
    for(let i = 0; i < questionsData.length; i += batchSize) {
      const batch = questionsData.slice(i, i + batchSize);
      console.log(`处理第 ${i/batchSize + 1} 批数据，数量：`, batch.length);
      
      const batchPromises = batch.map(question => {
        return collection.add({
          data: question
        });
      });
      
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      console.log(`第 ${i/batchSize + 1} 批数据处理完成`);
    }
    
    console.log('所有数据添加完成，总共添加：', results.length);
    
    return {
      success: true,
      message: `成功添加${results.length}条题目`,
      results: results
    };
  } catch (error) {
    console.error('添加题目时出错：', error);
    return {
      success: false,
      message: error.message,
      error: error
    };
  }
};

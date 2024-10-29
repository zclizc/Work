// pages/signin/signin.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    motto: '签到测距',
    choosen: {
      latitude: 0,
      longitude: 0
    },
    got: {
      latitude: 0,
      longitude: 0
    },
    flag1: false,
    flag2: false,
    showResultMessage: false,
    resultText: ''
  },

  chooseLocation: function () {
    wx.chooseLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          choosen: res,
          flag1: true
        });
        this.setResult('选择成功', '');
      }
    });
  },

  getLocation: function () {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          got: res,
          flag2: true
        });
        this.setResult('获取成功', '');
      }
    });
  },

  Rad: function (d) {
    return d * Math.PI / 180.0;
  },

  sign: function () {
    let lat1 = this.data.choosen.latitude;
    let lat2 = this.data.got.latitude;
    let lng1 = this.data.choosen.longitude;
    let lng2 = this.data.got.longitude;
    
    var radLat1 = this.Rad(lat1);
    var radLat2 = this.Rad(lat2);
    var a = radLat1 - radLat2;
    var b = this.Rad(lng1) - this.Rad(lng2);
    
    var s = 2 * Math.asin(Math.sqrt(
      Math.pow(Math.sin(a / 2), 2) + 
      Math.cos(radLat1) * Math.cos(radLat2) * 
      Math.pow(Math.sin(b / 2), 2)
    ));
    
    s = s * 6378137.0; // 地球平均半径，单位为米
    s = Math.round(s * 10000) / 10000; // 四舍五入到四位小数
    s = s.toFixed(2); // 保留两位小数
    
    this.setData({
      motto: '距离目的地 ' + s + ' 米' // 添加文本提示
    });

    // 根据距离判断签到结果
    if (s <= 50) {
      this.setResult('签到成功', '✅'); // 成功时显示对勾符号
    } else {
      this.setResult('距离过远，签到失败', ''); // 失败时仅显示文字
    }
  },

  setResult: function (text, icon) {
    this.setData({
      resultText: icon ? `${icon} ${text}` : text,
      showResultMessage: true
    });

    // 清除结果信息（可选）
    setTimeout(() => {
      this.setData({
        showResultMessage: false
      });
    }, 2000);
  }
});
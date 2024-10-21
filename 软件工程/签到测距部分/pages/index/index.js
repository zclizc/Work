//index.js
//获取应用实例
const app = getApp()
const userUrl=require('../../config.js').userUrl
const courseId = require('../../config.js').courseId
Page({
  data: {
    current_course:{},
    ques_count: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow:function(){
    var that = this
    wx.request({
      url: userUrl+'getDoneQuesCount',
      data:{
        openid: wx.getStorageSync('jiaoxue_OPENID'),
        courseId:courseId
      },
      success: function(res){
        // console.log(res)
        that.setData({
          ques_count: res.data.msg
        })
      }
    })
  },
  exercise(e){
    console.log(e)
    let type = e.currentTarget.dataset.type
    var _url
    if(type == 'sxlx'){
      _url="/pages/answer/answer_info/info?subject=&type=sxlx"
    }else if(type== 'zjlx'){
      _url = "/pages/answer/answer_chapter/chapter?subject=&type=zjlx"
    } else if (type == 'ztlx') {
      _url = "/pages/answer/answer_classify/classify?subject=&type=ztlx"
    }
    wx.navigateTo({
      url: _url,
    })
  },
  
  bindUrlToStore: function(f){
    var collection= f.currentTarget.dataset.collection,
      subject = f.currentTarget.dataset.urlparem
    if(!!collection){
      wx.navigateTo({
        url: '/pages/answer/answer_info/info?subject=subject&type=wdsc',
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '未发现您的收藏',
        showCancel: false,
        confirmText:'知道了',
        success: function(res){

        }
      })
    }
  },
  
  bindUrlToWrong: function (f) {
    var answerError = f.currentTarget.dataset.answererror,
      subject = f.currentTarget.dataset.urlparem;
    // console.log(answerError)
    if (!!answerError) {
      wx.navigateTo({
        url: '/pages/answer/answer_info/info?subject=subject&type=wdct',
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '恭喜您，暂无错题',
        showCancel: false,
        confirmText: '知道了',
        confirmColor:'#00bcd5',
        success: function (res) {

        }
      })
    }
  },
  onLoad: function () {
    this.getCurrentCourse(courseId)
  },
  getCurrentCourse(course_id=''){
    wx.request({
      url:userUrl + 'current',
      data:{
        current_course_id: course_id,
        openid: wx.getStorageSync('jiaoxue_OPENID'),
      },
      success: res=>{
        console.log('res1',res)
        this.setData({
          current_course: res.data.data
        })
      }
    })
  }
})

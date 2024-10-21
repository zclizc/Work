// pages/my/myinfo.js
Page({

    data: {
        userinfo:{ },
        sex_array:['保密','男','女']
      },
    
      choseImage:function(){
       this.openAlert('头像暂不支持修改')
      },
    
      openAlert:function(e){
        wx.showToast({
          title: e,
          icon:"none"
        })
      },
    
      onLoad: function (options) {
        this.setData({
           userinfo: wx.getStorageSync('userInfo')
        })
      },

      onShow: function () {
        this.setData({
          userinfo:wx.getStorageSync('userInfo')
        })
      },
})
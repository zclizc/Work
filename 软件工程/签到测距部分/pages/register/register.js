const userUrl = require('../../config.js').userUrl
const app = getApp()
Page({

    data: {
        name: '',
        tel: '',
        school: '',
        num: '',
        year: ''

    },

    changeName: function (e) {
        this.setData({
            name: e.detail.value
        })
    },

    changeTel: function (e) {
        this.setData({
            tel: e.detail.value
        })
    },

    changeSchool: function (e) {
        this.setData({
            school: e.detail.value
        })
    },

    changeNum: function (e) {
        this.setData({
            num: e.detail.value
        })
    },

    changeYear: function (e) {
        this.setData({
            year: e.detail.value
        })
    },

    bindSubmit: function (e) {
        
        wx.request({
            url: userUrl + 'register_by_openid',
            data: {
                openid: wx.getStorageSync('jiaoxue_OPENID'),
                globalData: JSON.stringify(app.globalData.userInfo),
                name: this.data.name,
                tel: this.data.tel,
                school: this.data.school,
                num: this.data.num,
                enter_year: this.data.year
            },
            success: res => {
                console.log('res1', res)
                if (res.data.is_register) {
                    wx.redirectTo({
                        url: '../index/index',
                    })
                } else {
                    // this.openAlert(res.data.data)
                }
            },
            fail: res => {},
        })
    },
    onLoad(){
        console.log(app.globalData);
    }
})
const userUrl = require('../../config.js').userUrl
Page({

    data: {
        placeholder: '',
        value: '',
        userinfo: wx.getStorageSync('userInfo'),
        infoArray: {
            name: '姓名',
            tel: '手机号',
            sex: '性别',
            school: '学校',
            number: '学号',
            enter_year: '入学年份'
        },
        sex_array: ['保密', '男', '女'],
        tmp: '',
        changeWhat: ''
    },

    valuechange: function (res) {
        this.setData({
            tmp: res.detail.value
        })
    },

    submit: function () {
        if (this.data.tmp == '') {
            wx.showToast({
                title: this.data.infoArray[this.data.changeWhat] + '不能为空',
                icon: 'none'
            })
            return
        }
        if (this.data.changeWhat == 'sex') {
            if (this.data.tmp == '男') {
                this.data.tmp = 1
            } else if (this.data.tmp == '女') {
                this.data.tmp = 2
            } else {
                this.data.tmp = 0
            }
        }
        if (this.data.tmp == this.data.userinfo[this.data.changeWhat]) {
            wx.navigateBack()
        } else {
            wx.request({
                url: userUrl + 'updateInfo',
                data: {
                    openid: wx.getStorageSync('jiaoxue_OPENID'),
                    change: this.data.changeWhat,
                    value: this.data.tmp
                },
                success: res => {
                    if (res.data.success) {
                        this.data.userinfo[this.data.changeWhat] = this.data.tmp,
                            wx.setStorageSync('userInfo', this.data.userinfo),
                            wx.navigateBack()
                    } else {
                        wx.showToast({
                            title: '修改失败',
                            icon: 'none'
                        })
                        wx.navigateBack()
                    }
                }
            })
        }
    },

    onLoad: function (options) {
        this.data.userinfo = wx.getStorageSync('userInfo'),
            console.log(options)
        this.setData({
            placeholder: '请输入' + this.data.infoArray[options.changeWhat],
            value: this.data.userinfo[options.changeWhat],
            changeWhat: options.changeWhat,
            tmp: this.data.userinfo[options.changeWhat]
        })
        if (options.changeWhat == 'sex') {
            this.setData({
                value: this.data.sex_array[this.data.userinfo[options.changeWhat]]
            })
        }
        wx.setNavigationBarTitle({
            title: '修改' + this.data.infoArray[options.changeWhat],
        })
    },
})
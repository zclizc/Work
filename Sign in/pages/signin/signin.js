// pages/signin/signin.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        motto: 'hello world',
        choosen: {
            latitude: 0,
            longitude: 0
        },
        got: {
            latitude: 0,
            longitude: 0
        },
        flag1: false,
        flag2: false
    },

    chooseLocation: function () {
        wx.chooseLocation({
            type: 'gcj02',
            success: (res) => {
                // console.log(res)
                this.setData({
                    choosen: res,
                    flag1: true
                })
            }
        })
    },

    getLocation: function () {
        wx.getLocation({
            success: (res) => {
                this.setData({
                    got: res,
                    flag2: true
                })
            },
        })
    },

    Rad: function (d) {
        return d * Math.PI / 180.0;
    },

    calculate: function () {
        let lat1 = this.data.choosen.latitude
        let lat2 = this.data.got.latitude
        let lng1 = this.data.choosen.longitude
        let lng2 = this.data.got.longitude
        var radLat1 = this.Rad(lat1);
        var radLat2 = this.Rad(lat2);
        var a = radLat1 - radLat2;
        var b = this.Rad(lng1) - this.Rad(lng2);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378137.0; // 取WGS84标准参考椭球中的地球长半径(单位:m)
        s = Math.round(s * 10000) / 10000;
        s = s.toFixed(2)
        this.setData({
            motto: s + 'm'
        })
    },

})
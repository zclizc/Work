//小程序配置文件
var apiUrl ="https://zjgsujiaoxue.applinzi.com/index.php/Api"
var appid = wx.getAccountInfoSync().miniProgram.appId

var config ={
  apiUrl,
  appid,
  wxUrl:`${apiUrl}/Weixin/`,
  userUrl: `${apiUrl}/User/`
};

module.exports = config
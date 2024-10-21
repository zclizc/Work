//小程序配置文件
var apiUrl ="https://zjgsujiaoxue.applinzi.com/index.php/Api"
var appid = wx.getAccountInfoSync().miniProgram.appId

var config ={
  apiUrl,
  appid,
  wxUrl:`${apiUrl}/Weixin/`,
  userUrl: `${apiUrl}/User/`,
  //把 courseId 换成自己的 couseId
  //http://zjgsujiaoxue.applinzi.com/index.php/Api/User/createCourse?appid=123&courseName=1028教学&questionSet=1012&creater=大佬
  //还没申请课程号的去上述地址申请，注意更换 appid、courseName、questionSet、creater 后面的内容
  //appid代表开发者小程序的appid，courseName代表要创建的课程的名字，开发者可自定义，questionSet代表预设的题目集（后续无法更改），creater代表创建者
  courseId:13267
};

module.exports = config
var express = require('express');
var router = express.Router();
var common = require('./loginCommon');
var userdb = common.userdb;

/* GET users listing. */
router.get('/', function(req, res, next) {
  if(isLogined(req)){
    res.render('users',{
      msg:"您登录为："+req.cookies["account"].account, 
      title:"登录状态",
      lastTime:"上次登录："+req.cookies["account"].last,
      login:true
    });
  }else{
    res.render('users',{
      title:"未登录状态",
      login:false
    });
  }
});

router.get('/logout', function(req, res, next){
  res.clearCookie("account");
  res.send("logout");
});

function authenticate(userName,password) {
  for(var i = 0; i < userdb.length; i++) {
    var user = userdb[i];
    if(userName === user.userName) {
      if(password === user.password) {
        return 0;//用户名，密码正确
      } else {
        return 1;//用户名正确，密码错误
      }
    }
  }
  return 2;//用户名，密码都不正确
}

function isLogined(req) {
  if(req.cookies["account"] != null) {
    var account = req.cookies["account"];
    var user = account.account;
    var pass = account.password;
    if(authenticate(user,pass) == 0) {
      console.log("has logined.");
      return true;
    }
  }
  return false;
}

module.exports = router;

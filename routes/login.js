var express = require('express');
var router = express.Router();
var common = require('./loginCommon');
var userdb = common.userdb;

/* GET 登录页. */
router.get('/', function(req, res, next) {
    res.render('login');
});

function getLastLoginTime(userName) {
  for(var i = 0; i < userdb.length; i++) {
    var user = userdb[i];
    if(userName === user.userName){
      return user.last;
    }
  }
  return "";
}

function updateLastLoginTime(userName) {
  for(var i = 0; i < userdb.length; i++) {
    var user = userdb[i];
    if(userName === user.userName) {
      user.last = Date().toString();
      return;
    }
  }
}

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

router.post('/login', function(req, res, next) {
  var userName = req.body.name;
  var password = req.body.password;
  console.log("login-name:" + userName + "password:" + password);
  switch(authenticate(userName,password)) {
    case 0:
      var lastTime = getLastLoginTime(userName);
      updateLastLoginTime(userName);
      console.log("login success");
      res.cookie("account", {account: userName, password: password, last: lastTime}, {maxAge: 60000});
      res.send({msg:"登录成功",state:0})
      break;
    case 1: //password error
      console.log("password error");
      res.send({msg:"密码错误！",state:1});
      break;
    case 2: //user not found
      console.log("user not found");
      res.send({msg:"用户名不存在！",state:2});
      break;
  }
})

module.exports = router;
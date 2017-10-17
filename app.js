var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');

var app = express();

// view engine setup 设置放置模板文件的目录以及使用的模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//设置静态资源存放目录
app.use(express.static(path.join(__dirname, 'public')));

//加载路由
app.use('/', index);
app.use('/users', users);
app.use('/login', login);

// catch 404 and forward to error handler 捕获错误
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  console.log('Zhangyanwei 404');
  next(err);
});

// error handler   错误处理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

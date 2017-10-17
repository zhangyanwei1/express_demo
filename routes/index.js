var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**demo 路由：get */
router.get('/get', function(req,res) {
  res.json(req.body);
})

/**demo 路由：post */
router.post('/post', function(req,res) {
  res.json(req.body);
})

/**app.all() 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。 */
router.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
}, function(req,res) {
  res.send("next")
});

/**
 * 响应方法：
 * res.downlowd() //提示下载文件
 * res.end()  //终结响应处理流程
 * res.json()  //发送一个json格式的响应
 * res.jsonp()  //发送一个支持JSONP的JSON格式的响应
 * res.redirece()  //重定向请求
 * res.render()  //渲染视图模板
 * res.send()    //发送各种类型的响应
 * res.sendFile() //以八位字节流的形式发送文件
 * res.sendStatus() //设置响应状态代码，并将其以字符串形式作为响应体的一部分发送
 */

module.exports = router;

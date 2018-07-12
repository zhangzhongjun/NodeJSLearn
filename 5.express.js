const express = require("express")
const expressStatic = require("express-static")

// 1.创建服务
var server = express();

var users={
  "user1":"pass1",
  "user2":"pass2"
};


// 2.监听
server.listen(9999);



// 3. 处理请求
// use 处理get或者post请求
// get 处理get请求
// post 处理post请求
server.use('/a.html',(req,res)=>{
  console.log("客户端访问了a");
  res.send('<h1>处理get或者post请求</h1>');
  res.end();
});

server.get('/b.html',(req,res)=>{
  console.log("客户端访问了b");
  res.send('<h1>处理get请求</h1>');
  res.end();
});

server.post('/b.html',(req,res)=>{
  res.send('<h1>处理post请求</h1>');
  res.end();
});


server.get('/login.html',(req,res)=>{
  // 获得get请求中的请求数据
  var user = req.query['user'];
  var pass = req.query['pass'];
  if(users[user]==undefined){
    res.send({"success":false,"msg":"不存在该用户"});
  }else if (users[user]!=pass) {
    res.send({"success":false,"msg":"密码错误"});
  }else{
    res.send({"success":true,"msg":"登录成功"});
  }
});

// 使用中间件处理静态文件
server.use(expressStatic("./www"));

const express = require("express")

// 1.创建服务
var server = express();

server.use("/",function(req,res,next){
  console.log("链式操作1");
  req.a = 12;
  next();
});


// 2. 处理请求
server.use("/",function(req,res,next){
  console.log("链式操作2");
  // 会从链中的上一个结点中继承下来req
  console.log(req.a);
});

// 3.监听
server.listen(9999);

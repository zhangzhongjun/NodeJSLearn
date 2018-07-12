const express=require('express');
const cookieParser=require("cookie-parser");

var server=express();

server.listen(8989);

// 使用中间件 参数是解密密钥
server.use(cookieParser("your screct"));

server.use("/aaa/1.html",(req,res)=>{
  // 这里指定加密密钥
  req.secret="your secret";

  // path是指只有aaa路径下才能使用我的cookie localhost:8989/aaa/index.html
  // maxAge是指过期时间30*1000 ms
  res.cookie('user','zhong',{path:"/aaa",maxAge:300*1000});
  // singed表示要对cookie进行签名
  res.cookie("age","12",{signed:true,maxAge:100*1000});

  // 获得 无签名cookie
  console.log(req.cookies);
  // 获得 有签名cookie
  console.log(req.signedCookies);

  res.send("<h1>hello</h1>");
});

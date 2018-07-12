# NodeJS学习笔记

> nodejs实质上是提供了几个javascript的模块，对nodejs的学习也就是学习这几个模块

## HelloWorld

1. 编写HelloWorld.js

```javascript
console.log("hello world");
```

2. cmd运行

```cmd
node HelloWorld.js
```

## http模块

```javascript
var http=require('http')

// 创建一个服务器
var server=http.createServer(function(request,response){
	console.log("有人来了");
	switch(request.url){
		case '/1.html':
			response.write("1111");
			break;
		case '/2.html':
			response.write("2222");
			break;
		default:
			response.write("404");
			break;
	}
	response.end();
});

//监听
server.listen(8888);
```

## fs模块

```javascript
const fs = require('fs')

fs.readFile('index.html',function(error,data){
	if(error){
		console.log(error);
	}else{
		//二进制数据
		console.log(data);
		//转化为可读的文字
		console.log(data.toString());
	}
});

fs.writeFile("test.txt","asd",function(error){
	console.log(error);
});
```

## url模块

```javascript
const urlLib = require("url")

// true代表自动解析，从obj.query中直接获得map类型的数据
var obj = urlLib.parse("http://wwww.baidu.com/index.html?username=un&password=pw",true)

console.log(obj);
console.log(obj.pathname);
console.log(obj.query);
```

## querystring模块

>将字符串转化为json 对象

```javascript
const querystring = require("querystring")

var str = "username=123&password=qwe&age=12";

var obj = querystring.parse(str);

console.log(obj);
```

## 自定义模块

### require

```javascript
const mod1 = require("./mod.js")
//等价于
const mod1 = require("./mod.js")
```

### exports

javascript中是没有全局变量的，想要对外输出东西，需要使用exports

```javascript
var a = 12;
var b = 13;
// 将a输出
exports.a=12;
```

### module

批量输出东西

```javascript
module.exports={

};
```

## npm

> 网址为https://www.npmjs.com/
> 用户名：zhangzhongjun
> 密码：/\*zhong\*/
>

=====

> 在下文中，文件夹MyNpmTest自定义了一个模块，而文件夹MyNpmTest_use_it演示了如何使用这个模块

1. 登录
```bash
// 登录npm
npm login
```

2. 检查登录状态
```bash
npm whoami
```

3. 将一个文件夹变为npm结构

```bash
cd MyNpmTest
npm init
```

在执行完init之后，会在该文件夹下生成一个package.json的文件
```json
{
  "name": "zzjtest123",
  "version": "0.0.1",
  "description": "我的测试的包zzj",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "zzj",
    "测试",
    "123"
  ],
  "author": "张中俊",
  "license": "ISC"
}
```

4. 发布

```bash
npm publish
```

5. 在你的项目文件夹中安装包

```bash
cd MyNpmTest_use_it
npm install zzjtest123
```

6. 在你的项目文件中更新包

```bash
cd MyNpmTest_use_it
npm update zzjtest123
```

## express模块

```javascript
const express = require("express")

// 1.创建服务
var server = express();

// 2. 处理请求
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

// 3.监听
server.listen(9999);
```

### express 中的链式操作

```javascript
server.use("/",function(req,res,next){
  console.log("链式操作1");
  req.a = 12;
  next();
});


server.use("/",function(req,res,next){
  console.log("链式操作2");
  // 会从链中的上一个结点中继承下来req
  console.log(req.a);
});
```

## express  中间件

###  express-static
express 是一个插件型的框架，即允许其他的开发者为express开发插件
express-static 就是一个处理静态资源的中间件

```javascript
// 1.创建服务
var server = express();

// 2.监听
server.listen(9999);


// 3.使用中间件处理静态文件
server.use(expressStatic("./www"));
```

### cookie-parser

cookie-parser是一个解析cookie的插件

```javascript
const cookieParser=require("cookie-parser");
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
```

### cookie-session

cookie-session是用于操作session，该插件依赖于插件cookie-parser

```javascript
const cookieParser=require("cookie-parser");
const cookieSession=require("cookie-session")
server.use(cookieParser());

server.use(cookieSession({
  // 密钥池
  keys:["your secret1","your secret2","your secret3"],
  // 指定session的有效期 20*1000 ms
  maxAge:20*1000
}))

server.use("/",(req,res)=>{
  if(req.session['count']==null){
    req.session['count']=1;
  }else{
    req.session['count']++;
  }

  console.log(req.session['count']);
  res.send("ok")
})
```


### 写一个自己的中间件

我现在想写一个自己bodyparse中间件

libs/my-body-parser.js
7.express使用自定义的中间件.js

![express的中间件](imgs/express的中间件.png)

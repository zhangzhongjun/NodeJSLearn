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


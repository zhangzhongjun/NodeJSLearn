const http=require('http')
const fs = require("fs")
const urlLib = require("url")
const querystring = require("querystring")

var users = {};

// 创建一个服务器
var server=http.createServer(function(request,response){
	console.log("客户端请求了"+request.url);

	//====处理get请求====================================
	var obj = urlLib.parse(request.url,true);
	var url = obj.pathname
	var GET = obj.query
	console.log("GET请求",url,GET);
	//====================================================

	//====处理post请求====================================
	//事件，当有数据到达时调用
	var str="";
	var i=1;
	request.on('data',function(data){
		str += data;
		console.log("第 "+i+" 次接收到数据");
	});

	// 事件，当数据接收完毕时调用
	request.on('end',function(){
		const POST=querystring.parse(str);
		console.log("POST请求",url,POST);
	});
	//===================================================

	if(url=="/user"){
		console.log("客户端访问了接口user");
		// 说明浏览器访问的是接口
		switch (GET.act) {
			case 'reg':
				//1. 检查用户名是否已经存在
				if(users[GET.user]){
					var msg = {"ok":false,"msg":"此用户已经存在"};
					console.log(JSON.stringify(msg));
					response.write(JSON.stringify(msg));
				}else{
					users[GET.user] = GET.pass;
					var msg = {"ok":true,"msg":"注册成功"};
					console.log(JSON.stringify(msg));
					response.write(JSON.stringify(msg));
				}
				break;
			case 'login':
				//1. 检查用户名
				if(user[GET.user]){
					if(user[GET.user]==GET.pass){
						var msg = {"ok":true,"msg":"登录成功"};
											console.log(JSON.stringify(msg));
						response.write(JSON.stringify(msg));
					}else{
						var msg = {"ok":false,"msg":"密码不正确"};
											console.log(JSON.stringify(msg));
						response.write(JSON.stringify(msg));
					}
				}else{
					var msg = {"ok":false,"msg":"用户名不存在"};
										console.log(JSON.stringify(msg));
					response.write(JSON.stringify(msg));
				}
				break;
			default:
				var msg = {"ok":false,"msg":"访问了不存在的接口"};
									console.log(JSON.stringify(msg));
				response.write(JSON.stringify(msg));
				break;

		}
	}else{
		//====处理文件请求====================================
		//获得文件目录
		var fileName = "./www"+request.url;
		fs.readFile(fileName,(error,data)=>{
			if(error){
				response.write("500错误");
			}else{
				response.write(data);
			}
			response.end();
		});
		//===================================================
	}
});

//监听
server.listen(8888);
console.log("服务器正在监听端口 8888");

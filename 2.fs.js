const fs = require('fs')

fs.readFile('./www/index.html',function(error,data){
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
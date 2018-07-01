const urlLib = require("url")

// true代表对obj.query自动解析，从obj.query中直接获得map类型的数据
var obj = urlLib.parse("http://wwww.baidu.com/index.html?username=un&password=pw",true)

console.log(obj);
console.log(obj.pathname);
console.log(obj.query);

// false代表不解析，从obj.query中获得字符串类型的数据
var obj = urlLib.parse("http://wwww.baidu.com/index.html?username=un&password=pw",false)

console.log(obj);
console.log(obj.pathname);
console.log(obj.query);
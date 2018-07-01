const querystring = require("querystring")

var str = "username=123&password=qwe&age=12";

var obj = querystring.parse(str);

console.log(obj);
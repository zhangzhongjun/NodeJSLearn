const express=require("express")
const cookieParser=require("cookie-parser");
const cookieSession=require("cookie-session")

var server = express();

server.listen(8989)

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

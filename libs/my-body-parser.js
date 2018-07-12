const querystring=require('querystring');

module.exports={
  aaa: function (){
     // 注意这里是express 的流水线操作
    return function (req, res, next){
      var str='';
      req.on('data', function (data){
        str+=data;
      });
      req.on('end', function (){
        req.body=querystring.parse(str);
        // 使用next将控制权移交回去
        next();
      });
    };
  }
}

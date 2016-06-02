var app = require('express');
var router=app.Router();

router.get('/',function (req,res,next) {
  res.render('helloworld',{title:'Hai! helloworld'});
});
module.exports=router;

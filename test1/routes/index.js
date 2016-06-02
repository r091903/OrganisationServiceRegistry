var express = require('express');
var router = express.Router();
var service=require('./master');
/* GET home page. */
router.get('/', function(req, res) {
  //res.render('index', { title: 'Express' });
  service.getNodeMaster(function(err,data){
    if(err) console.log(err);
    console.log(data);
    //console.log("title-------------");

     res.json({msg:data});
  });
});
router.get('/edge', function(req, res) {
  //res.render('index', { title: 'Express' });
  service.getEdgeMaster(function(err,data){
    if(err) console.log(err);
    console.log(data);
    //console.log("title-------------");

     res.json({msg:data});
  });
});


module.exports = router;

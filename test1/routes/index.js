var express = require('express');
var router = express.Router();
var nodeMaster = require('../models/nodeMaster.model');
var edgeMaster = require('../models/edgeMaster.model');
// router.get('/', function(req, res) {
//   //res.render('index', { title: 'Express' });
//   edgemaster.getNodeMaster(function(err,data){
//     if(err) console.log(err);
//     console.log(data);
//     //console.log("title-------------");
//      res.json({msg:data});
//   });
// });

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.get('/node', function(req, res) {
  //res.render('index', { title: 'Express' });
  nodeMaster.getNodeMaster(function(err,data) {
    console.log(data);
    res.json(data);
  });
});
router.get('/edge', function(req, res) {
  //res.render('index', { title: 'Express' });
  edgeMaster.getEdgeMaster(function(err,data) {
    console.log(data);
    res.json(data);
  });
});


module.exports = router;

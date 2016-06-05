var express = require('express');
var router = express.Router();
var nodeMaster = require('../models/nodeMaster.model');
var edgeMaster = require('../models/edgeMaster.model');

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

router.post('/nodefor', function(req, res) {
  //res.render('index', { title: 'Express' });
  var orgName=req.body.organisationName;
  console.log("name : "+orgName);
  nodeMaster.getNodeMasterFor(orgName,function(err,data) {
    console.log(data);
    res.json(data);
  });
});
router.post('/edgefor', function(req, res) {
  //res.render('index', { title: 'Express' });
  var orgName=req.body.organisationName;
  edgeMaster.getEdgeMasterFor(orgName,function(err,data) {
    console.log(data);
    res.json(data);
  });
});


module.exports = router;

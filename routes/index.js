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

router.get('/node/:orgId/:language', function(req, res) {
  //res.render('index', { title: 'Express' });
  var orgId=req.params.orgId;
  var language=req.params.language;
  console.log("org id : "+orgId);
  nodeMaster.getNodeMasterFor(orgId,language,function(err,data) {
    // console.log(data);
    res.json(data.nodemaster);
  });
});
router.get('/edge/:orgId/:language', function(req, res) {
  //res.render('index', { title: 'Express' });
  var orgId=req.params.orgId;
  var language=req.params.language;
  edgeMaster.getEdgeMasterFor(orgId,language,function(err,data) {
    // console.log(data);
    res.json(data.edgemaster);
  });
});

router.get('/node/:orgId/:language/service/:serviceId',function (req,res) {
  var orgId=req.params.orgId;
  var language=req.params.language;
  var serviceId=req.params.serviceId;
  nodeMaster.getNodeMasterService(orgId,language,function (err,data) {
    if(data===null){
      res.send("No details found for organisation id");
    }
    else{
      service={};
      if(data.nodemaster.servicesDetails[serviceId]===undefined){
        res.send("service id not found");
      }
      else{
        //service.serviceDisplayName=data.nodemaster.servicesDetails[serviceId].displayName;
        service.serviceObject=data.nodemaster.services[serviceId];
        res.json(service);
      }
    }
  });
});


router.get('/edge/:orgId/:language/service/:serviceId',function (req,res) {
  var orgId=req.params.orgId;
  var language=req.params.language;
  var serviceId=req.params.serviceId;
  edgeMaster.getEdgeMasterService(orgId,language,function (err,data) {
    if(data===null){
      res.send("No details found for organisation id");
    }
    else{
      service={};
      if(data.edgemaster.services[serviceId]===undefined){
        res.send("service id not found");
      }
      else{
        // service.serviceDisplayName=data.edgemaster.servicesDetails[serviceId].displayName;
        service.serviceObject=data.edgemaster.services[serviceId];
        res.json(service);
      }

    }
  });
});


module.exports = router;

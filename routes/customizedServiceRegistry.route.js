var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('underscore');
var nodeMaster = require('../models/nodeMaster.model');
var edgeMaster = require('../models/edgeMaster.model');
var serviceUtility = require('./customizedServiceRegistry.controller');

router.get('/', function (req, res) {
  var nodeMasterJson;
  var ruleBookJson = {};
  var exclusionJson = {};
  var edgeMasterJson = {};
  var user;

  console.log("im in customizedServiceRegistry");
  user = req.user;
  request({
    method: 'GET',
    url: 'http://localhost:8060/rule/band/' + user.band + '/exp/' + user.work_experience_in_year,
    headers : {
      'Accept': 'application/json'
    }
  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //Temporary Hack have body should always be in json.
      ruleBookJson = JSON.parse(body);
      console.log("Printing",ruleBookJson);
    }
    nodeMaster.getNodeMasterFor(user.organisation_name, user.preferred_language, function (err, data) {
      nodeMasterJson = JSON.parse(JSON.stringify(data.nodemaster));
      //reading or iterating original nodeMasterJson and then checking in rule book if there exists some rule for each service in iteration  if it exists then they are passes to respective interpreter for interpretion
      for (service in nodeMasterJson.services) {
        var ruleChecker = serviceUtility.ifRuleExists(service, ruleBookJson);
        if (ruleChecker.exists) {
          console.log("rules are");
          // console.log(ruleChecker.rule);
          console.log(JSON.stringify(ruleChecker.rule));
          serviceUtility.ruleInterpreter(ruleChecker.rule, nodeMasterJson,user,exclusionJson);

        }
      }
      for (key in nodeMasterJson.essential) {
        for (service in nodeMasterJson.essential[key]) {
          var ruleChecker = serviceUtility.ifRuleExists(service, ruleBookJson);
          if (ruleChecker.exists) {
            console.log("rules are");
            console.log(ruleChecker.rule);
            console.log(JSON.stringify(ruleChecker.rule));
            serviceUtility.ruleInterpreter(ruleChecker.rule, nodeMasterJson,user,exclusionJson);
          }

        }
      }

      // res.json(data);
    });
    edgeMaster.getEdgeMasterFor(user.organisation_name, user.preferred_language, function (err, data) {
      console.log(data);
      edgeMasterJson = JSON.parse(JSON.stringify(data.edgemaster));

      //reading or iterating original edgmasterJson and then checking in rule book if there exists some rule for each service in iteration  if it exists then they are passes to respective interpreter for interpretion


      for (services in edgeMasterJson.services) {
        var ruleChecker = serviceUtility.ifRuleExists(services, ruleBookJson);
        if (ruleChecker.exists) {
          console.log("rules are");
          console.log(ruleChecker.rule);
          console.log(JSON.stringify(ruleChecker.rule));
          serviceUtility.ruleInterpreter(ruleChecker.rule, edgeMasterJson,user,exclusionJson);

        }


      }
      for (key in edgeMasterJson.essential) {
        for (service in edgeMasterJson.essential[key]) {
          var ruleChecker = serviceUtility.ifRuleExists(service, ruleBookJson);
          if (ruleChecker.exists) {
            console.log("rules are");
            console.log(ruleChecker.rule);
            console.log(JSON.stringify(ruleChecker.rule));
            serviceUtility.ruleInterpreter(ruleChecker.rule, edgeMasterJson,user,exclusionJson);
          }

        }
      }
      var customizedData = {
        "customizedNodeMaster": nodeMasterJson,
        "customizedEdgeMaster": edgeMasterJson,
        "exclusionJson": exclusionJson
      }
      res.json(customizedData);
    });
  });
});

//checking whether rule exists for particular service if yes then returning set of rules


module.exports = router;

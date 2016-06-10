var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('underscore');
var nodeMasterJson;
var ruleBookJson;
var exclusionJson={};
var edgeMasterJson;
var nodeMaster = require('../models/nodeMaster.model');
var edgeMaster = require('../models/edgeMaster.model');

router.get('/', function(req, res) {

  nodeMaster.getNodeMaster(function(err,data) {
    console.log(data);
    nodeMasterJson=data;
  //  res.json(data);
  });
  edgeMaster.getEdgeMaster(function(err,data) {
    console.log(data);
    edgeMasterJson=data;
    // res.json(data);
  });

  var customizedData={
    "customizedNodeMaster":nodeMasterJson,
    "customizedEdgeMaster":edgeMasterJson,
    "exclusionJson":exclusionJson
  }
  res.json(customizedData);
});


// request('http://orgRegistry/node', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//   //  console.log(body) // Show the HTML for the Google homepage.
//     nodeMasterJson=response.data;
//   }
// })

// request('http://orgRegistry/edge', function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//   //  console.log(body) // Show the HTML for the Google homepage.
//     edgeMasterJson=response.data;
//   }
// })


request('http://Rules', function (error, response, body) {
  if (!error && response.statusCode == 200) {
  //  console.log(body) // Show the HTML for the Google homepage.
  ruleBookJson=response.data;
  }
})



//reading or iterating original nodeMasterJson and then checking in rule book if there exists some rule for each service in iteration  if it exists then they are passes to respective interpreter for interpretion
for(services in  nodeMasterJson.services )
{
  var ruleChecker=ifRuleExists(services);
  if(ruleChecker.exists)
  {
    console.log("rules are");
    console.log(ruleChecker.rule);
    console.log(JSON.stringify(ruleChecker.rule) );
    ruleInterpreter(ruleChecker.rule,nodeMasterJson);

  }
}
for(key in nodeMasterJson.essential)
{
    for(service in nodeMasterJson.essential[key])
  {
    var ruleChecker=ifRuleExists(service);
    if(ruleChecker.exists)
    {
      console.log("rules are");
      console.log(ruleChecker.rule);
      console.log(JSON.stringify(ruleChecker.rule) );
      ruleInterpreter(ruleChecker.rule,masterJson);
    }

  }
}


//reading or iterating original edgmasterJson and then checking in rule book if there exists some rule for each service in iteration  if it exists then they are passes to respective interpreter for interpretion


for(services in edgeMasterJson.services)
{
  var ruleChecker=ifRuleExists(services);
  if(ruleChecker.exists)
  {
    console.log("rules are");
    console.log(ruleChecker.rule);
    console.log(JSON.stringify(ruleChecker.rule) );
    ruleInterpreter(ruleChecker.rule,edgeMasterJson);

  }


}
for(key in edgeMasterJson.essential)
{
    for(service in edgeMasterJson.essential[key])
  {
    var ruleChecker=ifRuleExists(service);
    if(ruleChecker.exists)
    {
      console.log("rules are");
      console.log(ruleChecker.rule);
      console.log(JSON.stringify(ruleChecker.rule) );
      ruleInterpreter(ruleChecker.rule,edgeMasterJson);
    }

  }
}

//checking whether rule exists for particular service if yes then returning set of rules
function ifRuleExists(service)
  {
    console.log("ifRuleExists");
    var temp={};
    temp.exists=false;
    for(key in ruleBookJson)
    {

      if(ruleBookJson[key].serviceType==service)
      {
        temp.exists=true;
      }
    }


    var rules = _.filter(ruleBookJson, function(obj) {
      return obj.serviceType == service;
    });

    // chances are that, rules might be overlapped by the path, hence grouping it
    var rulesGroupedByPath = _.groupBy(rules,function(rule) {
      // console.log(rule)
      return rule.rule.path;
    });


    // under a particular grouping getting the object with highest priority
    var mappedObject = _.mapObject(rulesGroupedByPath,function(value,index) {
      return _.max(value,function(rule) {
        //  console.log(rule);
        return rule.priority;
      });
    });

    //finally stripping the groupedBy keys and getting values
    var rule = _.values(mappedObject);

    temp.rule=rule;

  }

//rule interpreter deciding which interpreter to call on basis of interpreterCategory
function ruleInterpreter(rules,reference)
{
  rules.forEach(function(rule)
  {

    if (rule.rule.interpreterCategory=="crudCategory")
    {
      crudCategoryInterpreter(rule,reference);
    }

    if (rule.rule.interpreterCategory=="statementInterpreterCategory")
    {
      statementInterpreterCategory(rule,reference);
    }

  });

}

//interpreter excluding values from original
function exclusionInterpreter(rule,reference)
{
  var exclusion=rule.rule.value;
  for(i=0;i<exclusion.length;i++)
  {
    path=rule.rule.path+"."+exclusion[i];
    deleteDynamicKeyValuePair(reference,path);
   // console.log(rule.rule.path);
  }
  setObj(exclusionJson,rule.rule.path,exclusion);

}

////interpreter replacing or modifying values from original
function replaceInterpreter(rule,reference)
{
  setObj(reference,rule.rule.path,rule.rule.value);
  //  setObj(exclusionJson,rule.rule.path,exclusion);
}

//special statement interpreter
function internationalTravelNotAllowedInterpretor(rule,reference)
{
var originalUrl=getValueFromdynamicKey(reference,rule.rule.path);
  var resetUrl;
  console.log(originalUrl);
  resetUrl=originalUrl+"/country/"+user.country;
  console.log(resetUrl);
  setObj(reference,rule.rule.path,resetUrl)
}

//to set object when path is given in form of a.b.c.d
function setObj(obj, keyString,value) {
        console.log("Before Replace ", keyString)
        keyString = keyString.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        console.log("After first replace", keyString);
        keyString = keyString.replace(/^\./, '');           // strip a leading dot
        console.log("After second replace", keyString);
        var hierarchyWiseKeysArray = keyString.split('.');

        while (hierarchyWiseKeysArray.length > 1)
        {
          if(obj[hierarchyWiseKeysArray[0]] == undefined){
            obj[hierarchyWiseKeysArray[0]] = {};
          }
          obj = obj[hierarchyWiseKeysArray.shift()];
        }
        return obj[hierarchyWiseKeysArray.shift()] = value;
};

////to delete object when path is given in form of a.b.c.d
function deleteDynamicKeyValuePair(obj, keyString) {
  console.log("Before Replace ", keyString)
  keyString = keyString.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  console.log("After first replace", keyString);
  keyString = keyString.replace(/^\./, '');           // strip a leading dot
  console.log("After second replace", keyString);
  var hierarchyWiseKeysArray = keyString.split('.');
  console.log("before while");
  console.log(hierarchyWiseKeysArray);
  while (hierarchyWiseKeysArray.length > 1)
    obj = obj[hierarchyWiseKeysArray.shift()];
  console.log("before delte");
  console.log(obj);
  delete obj[hierarchyWiseKeysArray.shift()];
  return obj;
}


////to get object when path is given in form of a.b.c.d
function getValueFromdynamicKey(obj,keyString) {

  keyString = keyString.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  keyString = keyString.replace(/^\./, '');           // strip a leading dot
  var hierarchyWiseKeysArray = keyString.split('.');
  while (hierarchyWiseKeysArray.length > 1)
    obj = obj[hierarchyWiseKeysArray.shift()];
  return obj[hierarchyWiseKeysArray.shift()];
}


module.exports = router;

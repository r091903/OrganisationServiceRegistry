//TODO: replace these dynamic finding of keys with Object-Path Module
var _ = require('underscore');
const objectPath = require('object-path');
module.exports = {
    ////to get object when path is given in form of a.b.c.d
    getValueFromdynamicKey: function (obj, keyString) {
        keyString = keyString.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        keyString = keyString.replace(/^\./, '');           // strip a leading dot
        var hierarchyWiseKeysArray = keyString.split('.');
        while (hierarchyWiseKeysArray.length > 1)
            obj = obj[hierarchyWiseKeysArray.shift()];
        return obj[hierarchyWiseKeysArray.shift()];
    },
    getObjFromDynamicKey: function(obj,keyString) {
        keyString = keyString.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        keyString = keyString.replace(/^\./, '');           // strip a leading dot
        var hierarchyWiseKeysArray = keyString.split('.');
        while (hierarchyWiseKeysArray.length > 1)
            obj = obj[hierarchyWiseKeysArray.shift()];
        return obj;
    },
    ////to delete object when path is given in form of a.b.c.d
    deleteDynamicKeyValuePair: function (obj, keyString) {
        console.log("inside objectpath",objectPath.del(obj,keyString));
        return obj;
    },
    //to set object when path is given in form of a.b.c.d
    setObj: function (obj, keyString, value) {
        console.log("Before Replace ", keyString)
        keyString = keyString.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
        console.log("After first replace", keyString);
        keyString = keyString.replace(/^\./, '');           // strip a leading dot
        console.log("After second replace", keyString);
        var hierarchyWiseKeysArray = keyString.split('.');
        while (hierarchyWiseKeysArray.length > 1) {
            if (obj[hierarchyWiseKeysArray[0]] == undefined) {
                obj[hierarchyWiseKeysArray[0]] = {};
            }
            obj = obj[hierarchyWiseKeysArray.shift()];
        }
        return obj[hierarchyWiseKeysArray.shift()] = value;
    },
    //special statement interpreter
    internationalTravelNotAllowedInterpretor: function (rule, reference, user) {
        var originalUrl = this.getValueFromdynamicKey(reference, rule.rule.path);
        var resetUrl;
        console.log(originalUrl);
        resetUrl = originalUrl + "/country/" + user.country;
        console.log(resetUrl);
        this.setObj(reference, rule.rule.path, resetUrl)
    },

    ////interpreter replacing or modifying values from original
    replaceInterpreter: function (rule, reference) {
        this.setObj(reference, rule.rule.path, rule.rule.value);
          console.log("replaced");
            console.log(reference)
            console.log(rule.rule.path);
            console.log(rule.rule.value[0]);
            console.log(this.getValueFromdynamicKey(reference,rule.rule.path))
    },
    //interpreter excluding values from original
    exclusionInterpreter: function (rule, reference,exclusionJson) {
        var exclusion = rule.rule.value;
        console.log(typeof exclusion);
        console.log("exclusionList",exclusion);
        // exclusionList.forEach(function(exclusion)
        // {
        //     path = rule.rule.path + "." + exclusion;
        //     console.log("path",path);
        //     console.log("reference",reference);
        //     this.deleteDynamicKeyValuePair(reference, path);
        // })
        for (var i = 0; i < exclusion.length; i++) {
            var path = rule.rule.path + "." + exclusion[i];
            this.deleteDynamicKeyValuePair(reference, path);
        }
        this.setObj(exclusionJson, rule.rule.path, exclusion);
        console.log("value after exclusion is")
       this.getValueFromdynamicKey(reference,rule.rule.path);
       console.log(reference);
    },
    crudCategoryInterpreter: function (rule, reference,exclusionJson) {
        if (rule.rule.action == "exclusion") {
            this.exclusionInterpreter(rule, reference,exclusionJson)
        }
        if (rule.rule.action == "replace") {
            this.replaceInterpreter(rule, reference)
          
        }

    },
    statementInterpreterCategory: function statementInterpreterCategory(rule, reference,user) {
        if (rule.rule.action == "International Travel not allowed") {
            this.internationalTravelNotAllowedInterpretor(rule, reference,user)
        }
    },
    //rule interpreter deciding which interpreter to call on basis of interpreterCategory
    ruleInterpreter: function (rules, reference,user,exclusionJson) {

        rules.forEach((rule) => {
            if (rule.rule.interpreterCategory == "crudCategory") {
                this.crudCategoryInterpreter(rule, reference,exclusionJson);
            }
            if (rule.rule.interpreterCategory == "statementInterpreterCategory") {
                this.statementInterpreterCategory(rule, reference,user);
            }
        });
    },
    ifRuleExists: function (service, ruleBookJson) {
        var temp = {};
        temp.exists = false;
        ruleBookJson.forEach(function (rule) {
            if (rule.serviceType == service) {
                temp.exists = true;
            }
        });
        var rules = _.filter(ruleBookJson, function (obj) {
            return obj.serviceType == service;
        });
        // chances are that, rules might be overlapped by the path, hence grouping it
        var rulesGroupedByPath = _.groupBy(rules, function (rule) {
            return rule.rule.path;
        });
        // under a particular grouping getting the object with highest priority
        var mappedObject = _.mapObject(rulesGroupedByPath, function (value, index) {
            return _.max(value, function (rule) {
                return rule.priority;
            });
        });
        //finally stripping the groupedBy keys and getting values
        var rule = _.values(mappedObject);

        temp.rule = rule;
        return temp;
    }

}
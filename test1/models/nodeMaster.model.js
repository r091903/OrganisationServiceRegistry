const mongoose = require('mongoose');
var nodeMasterSchema = new mongoose.Schema({
  organisation:String,
  essential:
  {
    noDependencyData:{
      location: {
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
        data: String
      }
    }

    ,
    modesToSelectTheServices: {
      basicServices:{
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
        specificAttr:{
          domainList:[
            {
              serviceId:String, serviceDisplayName: String
            },
            {
              serviceId:String, serviceDisplayName: String
            }
          ]
        },
        listLabelKey: String,
        listLabelValue: String
      }
    }
  }
  ,
  servicesName:
  {
    stay: String,
    localTravel: String
  }
  ,
  services:
  {
    stay: {
      location:{
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
        dataReference: String
      },
      area: {
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
        data: String
      },
      checkindate:{
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String
      },
      checkoutdate:{
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String
      },
      checkinTime:{
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String
      },
      checkoutTime:{
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String
      }
      ,
      preferences:{
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
        specificAttr:{
          domainList:[String]
        }
      },
      rating:
      {
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
        specificAttr:{
          domainList:[String]
        }
      },
      nearBy : {
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
        specificAttr:{
          min:Number,
          max:Number
        }
      }
      ,
      inputTypeOfProperty:
      {
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
        specificAttr:{
          domainList:[String]
        }
      },
      stars:
      {
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
        specificAttr:{
          domainList:[String]
        }
      },
      amenities:{
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
        specificAttr:{
          domainList:[String]
        }
      },
      proximity: {
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
        specificAttr:{
          domainList:[String]
        }

      }

    }
    ,
    localTravel: {
      pickupPoint: {
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
        data: [String]
      },

      dropPoint: {
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
        data: [String]
      },
      inputTypeOfLocalTransport: {
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
        specificAttr:{
          domainList:[String]
        }
      },
      pickupDate: {
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String
      },
      pickupTime: {
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String
      }
    }
  }
});
nodeMasterSchema.statics.getNodeMaster = function(cb) {
    this.find({},cb);
}
module.exports = mongoose.model('nodeMaster',nodeMasterSchema,'nodemaster');

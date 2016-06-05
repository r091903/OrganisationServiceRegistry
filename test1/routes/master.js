// TODO: Shouldn't be in routes folder.
// All the models should be in models folder
// use SRP one model in one file

var mongoose = require('mongoose');

var nodemasterSchema = new mongoose.Schema({
  nodemaster:
  {
    essential: {
      noDependencyData:{
        location: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String,
          data: String
        }
      },
      modesToSelectTheServices: {
        basicServices:{
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String,
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
    },
    servicesName:{
      stay: String,
      localTravel: String
    },
    services: {
      stay: {
        location:{
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String,
          dataReference: String
        },
        area: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String,
          data: String
        },
        checkindate:{
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String
        },
        checkoutdate:{
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String
        },
        checkinTime:{
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String
        },
        checkoutTime:{
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String
        }
        ,
        preferences:{
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String,
          specificAttr:{
            domainList:[String]
          }
        },
        rating:
        {
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String,
          specificAttr:{
            domainList:[String]
          }
        },
        nearBy : {
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String,
          specificAttr:{
            min:Number,
            max:Number
          }
        }
        ,
        input_typeOfProperty:
        {
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String,
          specificAttr:{
            domainList:[String]
          }
        },
        stars:
        {
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String,
          specificAttr:{
            domainList:[String]
          }
        },
        amenities:{
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String,
          specificAttr:{
            domainList:[String]
          }
        },
        proximity: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String,
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
          input_type: String,
          data: [String]
        },

        dropPoint: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String,
          data: [String]
        },
        input_typeOfLocalTransport: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String,
          specificAttr:{
            domainList:[String]
          }
        },

        pickupDate: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String
        },
        pickupTime: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String
        }
      }

    }
  }

});
var edgemasterSchema = new mongoose.Schema({
  edgemaster:
  {
    organisation:String
    essential: {
      travelStartDate: {
        mandatory: Boolean,
        displayName: String,
        id: String,
        input_type: String
      } ,
      modesToSelectTheServices: {
        mode:{
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String,
          data: [String]
        },
        extraAddOnsServices: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          input_type: String,
          data: [String]
        }
      }
    },
    services: {
      flight:{
          travelStartDate:{
              mandatory: Boolean,
              displayName: String,
              id: String,
              input_type: String,
              dataReference: String
            },
            class:{
              mandatory:Boolean,
              displayName: String,
              id: String,
              input_type: String,
              data: [String]
            },
            numberOfHops: {
              mandatory: Boolean,
              displayName: String,
              id: String,
              input_type: String,
              data: {min: Number, max: Number }
            },
            departureTime: {
              mandatory: Boolean,
              displayName: String,
              id: String,
              input_type: String
            },
            airlines: {
              mandatory: Boolean,
              displayName: String,
              id: String,
              input_type: String,
              data: [String]
            }
      }
    }
  }

});

// var nodesEdges=mongoose.model('orgData',masterSchema,'orgData');

nodemasterSchema.statics.getNodeMaster = function (callback) {
  return this.find({},callback);
}
edgemasterSchema.statics.getEdgeMaster = function (callback) {
  return this.find({},callback);
}

var nodemaster = mongoose.model('nodemaster',nodemasterSchema,'nodemaster');
var edgemaster = mongoose.model('edgemaster',edgemasterSchema,'edgemaster');


module.exports = edgemaster;

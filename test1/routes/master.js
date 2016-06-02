var mongoose=require('mongoose');
// var locations=new mongoose.Schema({
//
// });
var nodemasterSchema=new mongoose.Schema({
  nodemaster:
  {
    essential: {
      noDependencyData:{
        location: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String,
          data: String
        }
      },
      modesToSelectTheServices: {
        basicServices:{
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String,
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
          type: String,
          dataReference: String
        },
        area: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String,
          data: String
        },
        checkindate:{
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String
        },
        checkoutdate:{
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String
        },
        checkinTime:{
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String
        },
        checkoutTime:{
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String
        }
        ,
        preferences:{
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String,
          specificAttr:{
            domainList:[String]
          }
        },
        rating:
        {
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String,
          specificAttr:{
            domainList:[String]
          }
        },
        nearBy : {
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String,
          specificAttr:{
            min:Number,
            max:Number
          }
        }
        ,
        typeOfProperty:
        {
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String,
          specificAttr:{
            domainList:[String]
          }
        },
        stars:
        {
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String,
          specificAttr:{
            domainList:[String]
          }
        },
        amenities:{
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String,
          specificAttr:{
            domainList:[String]
          }
        },
        proximity: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String,
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
          type: String,
          data: [String]
        },

        dropPoint: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String,
          data: [String]
        },
        typeOfLocalTransport: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String,
          specificAttr:{
            domainList:[String]
          }
        },

        pickupDate: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String
        },
        pickupTime: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String
        }
      }

    }
  }

});
var edgemasterSchema = new mongoose.Schema({
  edgemaster:
  {
    essential: {
      travelStartDate: {
        mandatory: Boolean,
        displayName: String,
        id: String,
        type: String
      } ,
      modesToSelectTheServices: {
        mode:{
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String,
          data: [String]
        },
        extraAddOnsServices: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          type: String,
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
              type: String,
              dataReference: String
            },
            class:{
              mandatory:Boolean,
              displayName: String,
              id: String,
              type: String,
              data: [String]
            },
            numberOfHops: {
              mandatory: Boolean,
              displayName: String,
              id: String,
              type: String,
              data: {min: Number, min: Number }
            },
            departureTime: {
              mandatory: Boolean,
              displayName: String,
              id: String,
              type: String
            },
            airlines: {
              mandatory: Boolean,
              displayName: String,
              id: String,
              type: String,
              data: [String]
            }
      }
    }
  }

});

// var nodesEdges=mongoose.model('orgData',masterSchema,'orgData');
var nodemaster=mongoose.model('nodemaster',nodemasterSchema,'nodemaster');
var edgemaster=mongoose.model('edgemaster',edgemasterSchema,'edgemaster');
var service={};


service.getNodeMaster=function (callback) {
  return nodemaster.find({},callback);
}
service.getEdgeMaster=function (callback) {
  return edgemaster.find({},callback);
}

module.exports=service;

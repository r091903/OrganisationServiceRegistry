const mongoose = require('mongoose');
var edgeMasterSchema=new mongoose.Schema(

  {
    orgId:String,
  	language:String,
    edgemaster:
    {
      servicesDetails:
      {
        flight:{
          icons: String,
          displayName: String
        },
        train:{
          icons:String,
          displayName: String
        },
        bus: {
          icons:String,
          displayName:String
        }
      },
    essential: {
      noDependencyData: {
        travelStartDate: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          inputType: String
        }
      },
      modesToSelectTheServices: {
        mode: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          inputType: String,
          specificAttr: {
            domainList: {flight:String, bus:String, train:String}
          }

        },
        extraAddOnsServices: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          inputType: String,
          specificAttr: {
            domainList: {visaOnArrival:String, forex:String}
          }
        }
      }
    },
    servicesIntializer:{
      flight:{

            state: String,
            requested: {String}
      },
      bus: {

            state: String,
            requested: {String}
      },
      train: {

            state: String,
            requested: {String}
      },
      visaOnArrival:[{

            state: String,
            requested: {String}
      }],
      forex: [{

            state: String,
            requested: {String}
      }]
    }
    ,
    services: {
      flight: {
        travelStartDate: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          inputType: String,
          dataReference: String
        },
        class: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          inputType: String,
          specificAttr: {
            domainList: {bussiness:String, economy:String}
          }

        },
        numberOfHops: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          inputType: String,
          specificAttr: {
  					floor:Number,
  					ceil: Number,
  					step: Number,
  					noSwitching: Boolean,
  					endPointsTranslate: {
  						prefix:String ,
  						postfix: String
  					},
  					sliderHandleTranslate: {
  						prefix: String
  					}
  				}
        },
        departureTime: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          inputType: String
        },
        airlines: {
          mandatory: Boolean,
          displayName: String,
          id: String,
          inputType: String,
          specificAttr: {
            domainList: {airAisa:String, airCosta:String, jet:String}
          }

        }

    },

    train: {

      travelStartDate: {
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
        dataReference: String
      },
      class: {
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
        specificAttr: {
          domainList: {sleeper:String, thirdAc:String}
        }

      },

      departureTime: {
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String
      }

    },
    bus: {

      travelStartDate: {
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
        dataReference: String
      },
      class: {
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
        specificAttr: {
          domainList: {sleeper:String, SemiSleeper:String}
        }

      },

      departureTime: {
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String
      }

    }
    }
    }
  }


);

edgeMasterSchema.statics.getEdgeMaster = function(cb) {
    this.find({},cb);
}
edgeMasterSchema.statics.getEdgeMasterFor = function(orgId,lang,cb) {
    this.findOne({orgId:orgId,language:lang},cb);
}
edgeMasterSchema.statics.getEdgeMasterService = function(orgId,lang,cb) {
    this.findOne({orgId:orgId,language:lang},cb);
}


module.exports = mongoose.model('edgeMaster',edgeMasterSchema,'edgemaster');

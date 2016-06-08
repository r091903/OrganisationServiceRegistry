const mongoose = require('mongoose');
var nodeMasterSchema = new mongoose.Schema(

  {
  	orgId:String,
  	language:String,
  	nodemaster:
  	{
  	servicesDetails:
  	{
  		stay:{
  			icons: String,
  			displayName: String
  		},
  		localTravel:{
  			icons:String,
  			displayName: String
  		}
  	},
  	essential: {
  		noDependencyData: {
  			location: {
  				mandatory: Boolean,
  				displayName: String,
  				id: String,
  				inputType: String,
  				specificAttr: {
  					url:String
  				}
  			}
  		},
  		modesToSelectTheServices: {
  			basicServices: {
  				mandatory: Boolean,
  				displayName: String,
  				id: String,
  				inputType: String,
  				specificAttr: {
  					domainList: {
  						stay: String,
  						localTravel: String
  					}
  				}

  			}
  		}
  	},
  	servicesIntializer:{
  		stay: [
  							{
  									state: String,
  									requested: {String}
  							}
  						],
  		localTravel: [{

  					state: String,
  					requested: {String}
  			}]
  	}
  	,
  	services: {
  		stay: {
  			location: {
  				mandatory: Boolean,
  				displayName: String,
  				id: String,
  				inputType: String,
  				specificAttr: {
  					url:String
  				}
  			},
  			area: {
  				mandatory: Boolean,
  				displayName: String,
  				id: String,
  				inputType: String,
  				specificAttr: {
  					url:String
  				}
  			},
  			checkinDate: {
  				mandatory: Boolean,
  				displayName: String,
  				id: String,
  				inputType: String
  			},
  			checkinDate: {
  				mandatory: Boolean,
  				displayName: String,
  				id: String,
  				inputType: String
  			},
  			checkinTime: {
  				mandatory: Boolean,
  				displayName: String,
  				id: String,
  				inputType: String
  			},
  			checkoutTime: {
  				mandatory: Boolean,
  				displayName: String,
  				id: String,
  				inputType: String
  			},
  			preferences: {
  				mandatory: Boolean,
  				displayName: String,
  				id: String,
  				inputType: String,
  				specificAttr: {
  					domainList: {ac:String ,nonAc:String}
  				}
  			},
  			rating: {
  				mandatory: Boolean,
  				displayName: String,
  				id: String,
  				inputType: String,
  				specificAttr: {
  					domainList: {oneStar:String, twoStar:String, threeStar:String, fourStar:String}
  				}
  			},
  			typeOfProperty: {
  				mandatory: Boolean,
  				displayName: String,
  				id: String,
  				inputType: String,
  				specificAttr: {
  					domainList: {guestHouse:String, hotels:String}
  				}
  			},
  			nearBy: {
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
  						prefix: String,
  						postfix: String
  					},
  					sliderHandleTranslate: {
  						prefix: String,
  						postfix: String
  					}
  				}
  			},

  			stars: {
  				mandatory: Boolean,
  				displayName: String,
  				id: String,
  				inputType: String,
  				specificAttr: {
  					domainList: {oneStar:String, twoStar:String, threeStar:String, fourStar:String}
  				}
  			},
  			amenities: {
  				mandatory: Boolean,
  				displayName: String,
  				id: String,
  				inputType: String,
  				specificAttr: {
  					domainList: {meetingRooms:String, swimmingPools:String, fitness:String, restaurants:String}
  				}
  			},
  			proximity: {
  				mandatory: Boolean,
  				displayName: String,
  				id: String,
  				inputType: String,
  				specificAttr: {
  					domainList: {metroStation:String, taxiStands:String, airports:String, railwayStations:String}
  				}

  			}

  		},
  		localTravel: {
  			pickupPoint: {
  				mandatory: Boolean,
  				displayName: String,
  				id: String,
  				inputType: String,
  				specificAttr: {
  					url:String
  				}
  			},

  			dropPoint: {
  				mandatory: Boolean,
  				displayName: String,
  				id: String,
  				inputType: String,
  				specificAttr: {
  					url:String
  				}
  			},
  			typeOfLocalTransport: {
  				mandatory: Boolean,
  				id: String,
  				displayName: String,
  				inputType: String,
  				specificAttr: {
  					domainList: {cab:String, bus:String}
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
  }
  }


);
nodeMasterSchema.statics.getNodeMaster = function(cb) {
    this.find({},cb);
}
nodeMasterSchema.statics.getNodeMasterFor = function(orgId,lang,cb) {
    this.findOne({orgId:orgId,language:lang},cb);
}
nodeMasterSchema.statics.getNodeMasterService = function(orgId,lang,cb) {
    this.findOne({orgId:orgId,language:lang},cb);
}


module.exports = mongoose.model('nodeMaster',nodeMasterSchema,'nodemaster');

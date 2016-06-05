const mongoose = require('mongoose');
var edgeMasterSchema=new mongoose.Schema({
  organisation:String,
  essential: {
    travelStartDate: {
      mandatory: Boolean,
      displayName: String,
      id: String,
      inputType: String
    } ,
    modesToSelectTheServices: {
      mode:{
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
        data: [String]
      },
      extraAddOnsServices: {
        mandatory: Boolean,
        displayName: String,
        id: String,
        inputType: String,
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
            inputType: String,
            dataReference: String
          },
          class:{
            mandatory:Boolean,
            displayName: String,
            id: String,
            inputType: String,
            data: [String]
          },
          numberOfHops: {
            mandatory: Boolean,
            displayName: String,
            id: String,
            inputType: String,
            data: {min: Number, max: Number }
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
            data: [String]
          }
    }
  }

});

edgeMasterSchema.statics.getEdgeMaster = function(cb) {
    this.find({},cb);
}
module.exports = mongoose.model('edgeMaster',edgeMasterSchema,'edgemaster');

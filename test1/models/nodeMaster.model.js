const mongoose = require('mongoose');

var nodeMasterSchema = new mongoose.Schema({
    essential: {
        noDependencyData: {
            location: {
                mandatory: Boolean,
                
            }
        }
    }
});


nodeMasterSchema.statics.getNodeMaster = function(cb) {
    this.find({},cb);
}

module.exports = mongoose.model('nodeMaster',nodeMasterSchema,'nodeMaster');
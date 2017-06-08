var mongoose = require("mongoose");
var SchemaNumPresent = mongoose.schema({
    NumberOfAttendances: {
            type: Number,
            required: true
            },
            
    Location_name: {
        type: String,
        required: true
    },
    
    Drone_name: {
          type: String,
        required: true
    },
    Time:{
        type: String,
        timestamp: true
    },
    ID:{
        type: Number,
        required: true,
        unique:true
        
    }
});

var Present = Module.exports = Mongoose.model ('Persent', SchemaNumPresent);
module.exports= {
  AllNumPresent: function (callback) {
      Present.find(callback);
  },
saveNumPresent: function (present, callback){
    Present.create(present, callback);
},
FindNumberPresent: function (id, callback){
    Present.find({ID:id}, callback);
}



};



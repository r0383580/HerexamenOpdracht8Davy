var mongoose = require("mongoose");
var SchemaLocations = mongoose.schema({
            
    Location_name: {
        type: String,
        required: true,
        unique: true
    },
    
    Drone_name: {
          type: String,
        required: true,
        unique: true
    },
    
    Drone_Mac_Adress  :{
        type: String, 
        required: true,
        unique: true
        
    }
});

var Location = Module.exports = Mongoose.model ('Location', SchemaLocations);
module.exports= {
    
saveLocation: function (location, callback){
    Location.create(location, callback);
},

  Alllocation: function (callback) {
      Location.find(callback);
  },

Findlocation: function (id, callback){
    Location.find({Drone_name:id}, callback);
},

Updatelocation: function (id,location,  callback){
    Location.find({Drone_name:id}, location,  callback);
}

};
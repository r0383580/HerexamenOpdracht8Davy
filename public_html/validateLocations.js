module.exports = {
    fieldsNotEmpty: function (object) {
        var errors = [];
        var i = 1; 
        if(object["Location_name"] == "" || typeof object["Location_name"] != "string"){
            errors.push(arguments[i]);
        }
        i++
        if(object["Drone_name"] == "" || typeof object["Drone_name"] != "string"){
            errors.push(arguments[i])
        }
        i++
        if(object["Drone_Mac_Adress"] == "" || typeof object["Drone_Mac_Adress"] != "string"){
            errors.push(arguments[i]);
        }
     
        return errors.length === 0 ? null : errors;
    }

};
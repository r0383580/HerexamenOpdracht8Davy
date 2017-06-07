module.exports = {
    fieldsNotEmpty: function (object) {
        var errors = [];
        var i = 1;
        if(object["NumberOfAttendances"] == "" || typeof object["NumberOfAttendances"] != "number"){
            errors.push(arguments[i])
        }
        i++
        if(object["Location_name"] <= 0 || typeof object["Location_name"] != "string"){
            errors.push(arguments[i]);
        }
        i++
        if(object["Drone_name"] == "" || typeof object["Drone_name"] != "string"){
            errors.push(arguments[i]);
        }
        i++
        if(object["Time"] == "" || typeof object["Time"] != "string"){
            errors.push(arguments[i]);
        }
        return errors.length === 0 ? null : errors;
    }

};
// inladen van de dependencies - externe dependencies inladen via het commando: 
// npm install express --save
// npm install body-parser --save

var mongoose = require('mongoose'); // Toen ik aan medeleerlingen vroeg over MongoDB raden ze deze aan.
var express = require('express'); // eenvoudige webserver in node js
var parser = require('body-parser'); // extensie op express voor eenvoudig body uit te lezen

mongoose.connect('mongodb://localhost:27017/MyApi'); //Databank raadplegen

// Toevoegen van de code van de dal vervangt onze
// onze lokale 'datastore'. deze variable bewaart onze state. 
var dalLocations = require("./storageLocation.js");
var dalNumPresent = require("./storageNumPresent.js");

//validatie inladen
var valLocations = require("./validateLocations.js");
var valNumPresent = require("./validateNummPresent.js");

// aanmaken van de webserver variabele
var app = express();
// automatische json-body parsers van request MET media-type application/json gespecifieerd in de request.
app.use(parser.json());

// opvangen van een GET op /Locations. 
app.get("/locations", function (request, response) {
  //stuurt als antwoord de inhoud van onze database. Standaard in json terug gestuurd.
  dalLocations.AllLocation(function (err, Location){
      if (err) {
          throw err;
  }
  response.send(Location);
});
});


// opvangen van een GET op /Locations/Drone_name 
app.get("/locations/:id", function (request, response) {
 dalLocations.findlocation(request.params.id, function (err, location){
  if(location) {
    response.send(location);
 } else {
        err;
    }
    });
});

// opvangen van een POST op /locations, het aanmaken van een nieuw location 
app.post("/locations", function (request, response) {
  // de data in de body wordt toegekend aan onze book variabele. 
  // deze is enkel opgevuld indien het JSON is.
  var location = request.body;

  // Valideren dat velden bestaan
  var errors = valLocations.fieldsNotEmpty(location, "Location_name","Drone_name","Drone_Mac_Adress"
);
  if (errors){
    response.status(400).send({msg:"Following field(s) are mandatory:"+errors.concat()});
    return;
  }
  /*Dit is niet meer nodig aangezien owe aangegeven hebben dat deze velden uniek moeten zijn en hierdoor niet 2x hetzelfde kunnden zijn
   * 
  // Valideren dat we locations niet 2x hetzelfde zijn
  var existingLocation = dal.findLocation(location.Drone_name);
  if(existingLocation){
    response.status(409).send({msg:"Drone_name must be unique, it's already registered", 
                               link:"../Locations/"+existingLocation.id});
    return;
  }
  */
  dalLocations.saveLocation(location, function(err, location){
      if(err){
          throw err;
          
      }
      response.send(location);
      
});
});

app.put("/locations/:id", function (request, response) {
    var location = request.body;
    // Valideren dat velden bestaan
    var errors = valLocations.fieldsNotEmpty(location, "Location_name","Drone_name","Drone_Mac_Adress");
    if (errors) {
        response.status(400).send({msg:"Following field(s) are mandatory:" + errors.concat()
        });
        return;
    }

    dalLocations.updateLocation(request.params.id, location, function (err, location) {
        if(err){
            throw err;
        }
        response.send(location);
    });
});





// opvangen van een GET op /Number present
app.get("/NumPresent", function (request, response) {
  //stuurt als antwoord de inhoud van onze database. Standaard in json terug gestuurd.
dalNumPresent.AllNumPresent(function (err, present) {
        if(err){
            throw err;
        }
        response.send(present);
    });
});

// opvangen van een GET op /NumPresent/:ID. 
app.get("/NumPresent/:id", function (request, response) {
  dalNumPresent.findNumPresent(request.params.id, function (err, present) {
      if (present) {
          response.send(present);
      } else {
          err;
      }
      });
});
  

// opvangen van een POST op /locations, het aanmaken van een nieuw location 
app.post("/NumPresent", function (request, response) {
  // de data in de body wordt toegekend aan onze book variabele. 
  // deze is enkel opgevuld indien het JSON is.
  var attendances = request.body;

  // Valideren dat velden bestaan
  var errors = valNumPresent.fieldsNotEmpty(attendances, "NumberOfAttendances", "Location_name", "Drone_name", "Time", "ID"

);
  if (errors){
    response.status(400).send({msg:"Following field(s) are mandatory:"+errors.concat()});
    return;
  }
  
   dalNumPresent.saveNumPresent(attendances, function(err, attendances) {
        if(err){
            throw err;
        }
        response.send(attendances);
    });
});



// de server starten op poort 4567 (bereikbaar op http://localhost:4567 )
app.listen(4567);
// lijntje voor te zien dat alles is opgestart.
console.log("Server started");
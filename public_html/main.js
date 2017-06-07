// inladen van de dependencies - externe dependencies inladen via het commando: 
// npm install express --save
// npm install body-parser --save

var uuid = require('uuid'); // ID toevoegen
var express = require('express'); // eenvoudige webserver in node js
var parser = require('body-parser'); // extensie op express voor eenvoudig body uit te lezen

// Toevoegen van de code van de dal vervangt onze
// onze lokale 'datastore'. deze variable bewaart onze state. 
var dal = require("./storage.js");

//validatie inladen
var validation = require("./validate.js");

// aanmaken van de webserver variabele
var app = express();
// automatische json-body parsers van request MET media-type application/json gespecifieerd in de request.
app.use(parser.json());

// opvangen van een GET op /Locations. 
app.get("/locaties", function (request, response) {
  //stuurt als antwoord de inhoud van onze database. Standaard in json terug gestuurd.
  response.send(dal.listAllLocations());
});

// opvangen van een GET op /Locations/[Drone_name]. 
app.get("/locations/:id", function (request, response) {
  var location = dal.findlocation(request.params.id);
  if(location) {
    response.send(locatie);
  }else {
    response.status(404).send();
  }
});

// opvangen van een POST op /locations, het aanmaken van een nieuw location 
app.post("/locations", function (request, response) {
  // de data in de body wordt toegekend aan onze book variabele. 
  // deze is enkel opgevuld indien het JSON is.
  var location = request.body;

  // Valideren dat velden bestaan
  var errors = validationLocations.fieldsNotEmpty(book, "Location_name","Drone_name","Drone_Mac_Adress"
);
  if (errors){
    response.status(400).send({msg:"Following field(s) are mandatory:"+errors.concat()});
    return;
  }
  
  // Valideren dat we locations niet 2x hetzelfde zijn
  var existingLocation = dal.findLocation(location.Drone_name);
  if(existingLocation){
    response.status(409).send({msg:"Drone_name must be unique, it's already registered", 
                               link:"../Locations/"+existingLocation.id});
    return;
  }
  // Id wordt gezet door de server, we kiezen hier voor de ISBN omdat we weten dat hij uniek is.
  location.id=location.Drone_name;
  // het boek toevoege in onze 'dal'.
  dal.saveLocation(Location);
  // de default httpstatus (200) overschrijven met 204 en geen antwoord specifiëren.
  response.status(201).location("../Locations/"+Location.id).send();
});

// opvangen van een GET op /Number present
app.get("/NumPresent", function (request, response) {
  //stuurt als antwoord de inhoud van onze database. Standaard in json terug gestuurd.
  response.send(dal.listAllNumPresent());
});

// opvangen van een GET op /NumPresent/[UUID]. 
app.get("/NumPresent/:id", function (request, response) {
  var location = dal.findNumPresentLocation(request.params.id);
  if(location) {
    response.send(location);
  }else {
    response.status(404).send();
  }
});

// opvangen van een POST op /locations, het aanmaken van een nieuw location 
app.post("/NumPresent", function (request, response) {
  // de data in de body wordt toegekend aan onze book variabele. 
  // deze is enkel opgevuld indien het JSON is.
  var attendances = request.body;

  // Valideren dat velden bestaan
  var errors = validationNumPresent.fieldsNotEmpty(attendances, "NumberOfAttendances", "Location_name", "Drone_name", "Time"

);
  if (errors){
    response.status(400).send({msg:"Following field(s) are mandatory:"+errors.concat()});
    return;
  }
  
 
  // Id wordt gezet door de server, we kiezen hier voor de ISBN omdat we weten dat hij uniek is.
 attendances.id= uuid.v4();
  // het boek toevoege in onze 'dal'.
  dal.saveNumPresentLocation(attendances);
  // de default httpstatus (200) overschrijven met 204 en geen antwoord specifiëren.
  response.status(201).location("../NumPresent/"+attendances.id).send();
});



// de server starten op poort 4567 (bereikbaar op http://localhost:4567 )
app.listen(4567);
// lijntje voor te zien dat alles is opgestart.
console.log("Server started");
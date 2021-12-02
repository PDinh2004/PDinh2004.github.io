var converter = require('./../middleware/converter');
var bodyParser = require('body-parser');
var sensorRoutes = require('./../routes/sensors');
var actuatorRoutes = require('./../routes/actuators');

const express = require('express'),
	cors = require('cors');
	
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/pi/sensors', sensorRoutes);
app.use('/pi/actuators', actuatorRoutes);

app.get("/", function(req, res){
        res.send("Someone accessed the homepage!");
})

app.get("/pi", function(req, res){
        res.send("Someone accessed the Pi page!");
})

app.use(converter());
module.exports = app;
// I have looked through all the files

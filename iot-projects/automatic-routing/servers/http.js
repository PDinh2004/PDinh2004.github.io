const createRouter = require('./../routes/automate');
const resources = require('./../resources/model');
var converter = require('./../middleware/converter');
var bodyParser = require('body-parser');
var actuatorRoutes = require('./../routes/actuators');

const express = require('express'),
	cors = require('cors');
	
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/pi/actuators', actuatorRoutes);

app.use('/', createRouter(resources));
app.use(converter());
module.exports = app;
// I have looked through all the files

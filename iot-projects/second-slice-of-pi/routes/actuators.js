const express = require('express'),
	router = express.Router(),
	resources = require('./../resources/model');

router.route('/').get(function (req, res, next) {
	req.result = resources.pi.actuators;
	next();
});

router.route('/leds').get(function (req, res, next) {
	req.result = resources.pi.actuators.leds;
	next();
});

router.route('/leds/1').get(function (req, res, next) {
	req.result = resources.pi.actuators.leds[1];
	next();
});

router.route('/leds/2').get(function (req, res, next) {
	req.result = resources.pi.actuators.leds[2];
	next();
});

module.exports = router;

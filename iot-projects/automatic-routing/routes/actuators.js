var ledsPlugin = require('./../plugins/internal/ledsPlugin');

const express = require('express'),
	router = express.Router(),
	resources = require('./../resources/model');

router.route('/leds/:id').put(function(req, res, next){
        var led = resources.pi.actuators.leds[req.params.id];
	led.value = req.body.value;
	req.result = led;
	ledsPlugin.switchOnOff[req.params.id](led.value);
	next();
});

module.exports = router;

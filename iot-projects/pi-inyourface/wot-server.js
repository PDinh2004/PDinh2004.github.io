const httpServer = require('./servers/http'),
	resources = require('./resources/model');

var pirPlugin = require('./plugins/internal/pirPlugin');
var dhtPlugin = require('./plugins/internal/dhtPlugin');
var ledsPlugin = require('./plugins/internal/ledsPlugin');
var webSockets = require("./servers/websockets");
pirPlugin.start({});
dhtPlugin.start({'frequency': 2000});
ledsPlugin.start({});

console.log('i made it');

const server = httpServer.listen(resources.pi.port, function () {
	console.log("Running the Pi on port " + resources.pi.port);
	webSockets.listen(server);
});

process.on('SIGINT', function() {
        pirPlugin.stop();
        dhtPlugin.stop();
        ledsPlugin.stop();
	process.exit();
});

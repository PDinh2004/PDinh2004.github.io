// requestServer.js file
const { reduce } = require("async");
const http = require("http");
const request = require("request");
const port = 8686;
var args = process.argv.slice(2);
var htopl = process.argv.slice(3);

http.createServer(function(req,res){
    var url = args[0] ? args[0] : "<a default url>";

    request(url, callBackFunction);

    function callBackFunction(error, response, body){
        if (!body || !response || (error === null && response.statusCode !== 200)){
            res.end("bad URL\n");
            return;
        } else if (response.statusCode === 200 && !error === true){
            res.writeHead(200, {"Content-Type": "text/" + htopl});
            res.write(body);
            res.end();
        } else {
            res.writeHead(response.statusCode, "text/plain");
            res.write(error.toString());
            res.end();
        }
    }

}).listen(port);
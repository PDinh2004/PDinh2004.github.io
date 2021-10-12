const http = require("http");
let port = process.argv[2];

http.createServer(function(req,res){

    res.writeHeader(200, {"Content-Type": "text/html"});
    res.write("<h1>This is running from my local server</h1>");
    res.write("h1: background, blue")
    res.end("<h1>Epic</h1>");

}).listen(port);
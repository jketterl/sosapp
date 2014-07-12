var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    WebsocketServer = require('websocket').server,
    broadcaster = require('./broadcaster');

var app = express();
app.use('/assets', express.static(__dirname + '/assets'));
routes(app);

var httpServer = http.createServer(app).listen(3000);

var wsServer = new WebsocketServer({
    httpServer: httpServer,
    autoAcceptConnections: false
});

wsServer.on('request', function(req){
    broadcaster.register(req.accept());
});

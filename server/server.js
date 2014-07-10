var express = require('express'),
    routes = require('./routes')

var app = express();
app.use('/assets', express.static(__dirname + '/assets'));
routes(app);
app.listen(3000);

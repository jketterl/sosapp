var express = require('express');
var routes = require('./routes');

var app = express();
routes(app);
app.listen(3000);


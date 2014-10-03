var express = require("express");
var app = express();
var port = process.env.PORT || 9000;

app.get('/', function(req, res){
    res.send('Hello World');
});

app.listen(port, function() {
    console.log('Listening on port ' +  port + " in mode: " + process.env.NODE_ENV);
});
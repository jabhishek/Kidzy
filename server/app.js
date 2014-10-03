var express = require("express");
var path = require("path");
var app = express();
var port = process.env.PORT || 9000;

var rootPath = path.normalize(__dirname + '/..');
var appPath = path.join(rootPath, 'build');

if (app.get("env" === "development")) {
    app.use(require('connect-livereload')());
};
app.use(express.static(appPath));
app.set("appPath", appPath);

app.route('/*')
    .get(function(req, res) {
        res.sendFile(app.get('appPath') + '/index.html');
    });
console.log(appPath);

app.listen(port, function() {
    console.log('Listening on port ' +  port + " in mode: " + process.env.NODE_ENV);
});

// Expose app
module.exports = app;
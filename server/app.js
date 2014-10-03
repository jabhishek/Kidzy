var express = require("express");
var path = require("path");
var app = express();
var port = process.env.PORT || 9000;

var rootPath = path.normalize(__dirname + '/..');
var appPath = path.join(rootPath, 'build');

if (app.get("env") === "development") {
    app.use(require('connect-livereload')());
};
app.use(express.static(appPath));
app.set("appPath", appPath);

// setup routes
require("./routes")(app);

app.listen(port, function() {
    console.log('Listening on port ' +  port + " in mode: " + process.env.NODE_ENV);
});

// Expose app
module.exports = app;
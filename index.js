//Basic webserver
var express = require('express'),
    app = express();

require('./routes')(app);

module.exports = app;

//config
app.set('view engine', 'pug');
app.set('views', __dirname+"/pages");

//standard
app.use(express.static(__dirname + '/public'));
app.use("/css", express.static(__dirname + '/css'));

//Starts and listens
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Listening on " + port + " | In folder " + __dirname + '\\public');
});

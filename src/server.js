var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = JSON.parse(fs.readFileSync('config/server-config.json'));
var databaseClient = require('app/core/db/databaseClient.js');
var router = require('app/router');

var sampleRouter = require('app/routers/sampleRoute');
var loginRouter = require('app/routers/loginRoute');

// Setting cookie Parser
app.use(cookieParser());

//Expecting all body requests to be JSON
app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Sample endpoint
app.get('/', function (req, res) {
    res.send('Hello World!');
});

//All the routers with context
app.use('/auth',loginRouter);
app.use('/sample', sampleRouter);

/*
app.use('/api',router);
*/
databaseClient.init(config);


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
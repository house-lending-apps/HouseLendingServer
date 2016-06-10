var express = require('express');
var app = express();
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync('./config/server-config.json'));
var databaseClient = require('./app/core/db/databaseClient.js');
var sampleRouter = require('./app/routers/sampleRoute');
var loginRouter = require('./app/routers/loginRoute');

// Setting cookie Parser
app.use(cookieParser());

//Expecting all body requests to be JSON
app.use(bodyParser.json()); // for parsing application/json
//app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// middleware that is specific to this router
router.use(function (req, res, next) {
    var logResp = {
        'Time': Date.now(),
        'request api': req.path,
        'request method': req.method,
        'request body': req.body,
        'request paras': JSON.stringify(req.params)
    };
    console.log(JSON.stringify(logResp));
    next();
});

// Core Components Init
databaseClient.init(config);


// Initiate Routers
loginRouter.init(app);
sampleRouter.init(app);

// Register router with app
app.get('/', router);


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

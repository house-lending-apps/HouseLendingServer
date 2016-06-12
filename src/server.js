var express = require('express');
var app = express();
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var serverConfig = JSON.parse(fs.readFileSync('./config/appconfig.json'));
var template_dir = serverConfig.client_template;

var databaseClient = require('./app/core/databaseClient.js');
var sampleRoutes = require('./app/routers/sampleRoutes');
var loginRoutes = require('./app/routers/loginRoutes');
var userRoutes = require('./app/routers/userRoutes');
var advertisementRoutes = require('./app/routers/advertisementRoutes');

var port = serverConfig.port === undefined ? '9000' : serverConfig.port;
if(process.env.PORT) {
    port = process.env.PORT;
}


// Setting cookie Parser
app.use(cookieParser());

//Expecting all body requests to be JSON
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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

// Definding where the templates be found
console.log('template_dir : ', template_dir);
app.use('/', express.static(__dirname + '/'));

// Core Components Init
databaseClient.init(serverConfig);

// Initiate Routers
sampleRoutes.init(app);
loginRoutes.init(app);
userRoutes.init(app);
advertisementRoutes.init(app);

// Register router with app
app.get('/', router);

app.set('port', port);
app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

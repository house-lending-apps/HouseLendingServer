var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var multer = require('multer'); // v1.0.5
//var upload = multer(); // for parsing multipart/form-data


var sampleRouter = require('./routers/sampleRoute');
var loginRouter = require('./routers/loginRoute');

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
app.use('/birds', sampleRouter);


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
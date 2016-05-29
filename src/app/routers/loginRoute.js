var express = require('express');
var router = express.Router();

var authenticatedUser =
{
    'status': 'authorized',
    'userId': 'test',
    'userInfo': {
        firstName: 'test',
        lastName: 'test'
    }
};

var self = this;

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    next();
});

// Healthcheck service
router.get('/', function (req, res) {
    res.status(200).send();
});

// define the home page route
router.post('/login', function (req, res) {
    res.cookie('userToken',authenticatedUser);
    res.json(authenticatedUser);
});


module.exports = router;
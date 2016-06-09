var express = require('express');
var router = express.Router();

var authResource = require('../api/auth/authResource');

// authenticate
router.get('/', function(req, resp, next){
   resp.status(200).send({'test':'test'});
});
router.head('/api/authenticate', authResource.healthcheck);
router.get('/api/authenticate', authResource.authenticate);

module.exports = router;
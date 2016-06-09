var express = require('express');
var router = express.Router();

var authResource = require('../api/auth/authResource');


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    next();
});

// Healthcheck service
router.head('/api/authenticate', authResource.healthcheck);
router.get('/api/authenticate', authResource.authenticate);

module.exports = router;
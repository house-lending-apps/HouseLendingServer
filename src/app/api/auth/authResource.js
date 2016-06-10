'use strict';

(function (authResource) {
    var authService = require('./authService');


    /*
     * Healthcheck service
     */
    authResource.healthcheck = function (req, res) {
        console.log('Healthcheck Auth Service');
        return res.status(200).json({});
    };

    /**
     * authenticate
     */
    authResource.authenticate = function (req, res) {
        console.log('Validating user : ' + req.params.user);
        authService.findMocked(req.params.user, function (err, result) {
            //authService.find(req.params.user, function(err, result) {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json(result);
        });
    };
})(module.exports);




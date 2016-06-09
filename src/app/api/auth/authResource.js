'use strict';

(function (authResource) {
    var authService = require('./authService');



    /*
     * Healthcheck service
     */
    authResource.healthcheck = function(req, res, next) {
        return res.status(200).json({});
    };

    /**
     * authenticate
     */
    authResource.authenticate = function(req, res, next) {
        console.log('Validating user : ' + req.params.user);
        authService.findMocked(req.params.user, function(err, result) {
        //authService.find(req.params.user, function(err, result) {
            if (err) {
                return next(err);
            }
            return res.status(200).json(result);
        });
    };
})(module.exports);



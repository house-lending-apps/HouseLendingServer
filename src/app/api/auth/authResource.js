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
    authResource.getUserDetails = function (req, res) {
        console.log(JSON.stringify(req.quey));
        console.log('Request to Get User Details for user : ' + req.query.user);

        if (!req.query.user) {
            return res.status(404).json({'error': 'unable to find user'});
        } else {
            var userDetails = {
                user: req.query.user
            };

            authService.findMocked(userDetails, function (err, result) {
                //authService.find(userDetails, function(err, result) {
                if (err) {
                    return res.status(500).json(err);
                }

                return res.status(200).json(result);
            });
        }

        return null;
    };

    /**
     * authenticate
     */
    authResource.authenticate = function (req, res) {
        console.log('Validating user : ' + req.body.user);
        if (!req.body.user && !req.body.password && !req.body.authMethod) {
            return res.status(404).json({'error': 'unable to find user'});
        } else {
            var userDetails = {
                user: req.body.user,
                password: req.body.password,
                authMethod: req.body.authMethod
            };

            authService.findMocked(userDetails, function (err, result) {
                //authService.find(userDetails, function(err, result) {
                if (err) {
                    return res.status(500).json(err);
                }

                return res.status(200).json(result);
            });
        }
        return null;

    };
})(module.exports);




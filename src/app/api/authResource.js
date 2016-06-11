'use strict';

(function (authResource) {
    var authService = require('./services/authService');


    /*
     * Healthcheck service
     */
    authResource.healthcheck = function (req, res) {
        console.log('Authenticate API Healthcheck Successful');
        return res.status(200).json({message: 'Authenticate API Healthcheck Successful'});
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

            //authService.findMocked(userDetails).then(function (result) {
            authService.findUser(userDetails).then(function (result) {
                if(result && result.length >= 1) {
                    return res.status(200).json(result);
                } else {
                    var errorMessage = {
                        'message':'Unable to find the user'
                    };
                    return res.status(404).json(errorMessage);
                }

            }, function (error) {
                return res.status(500).json(error);
            });
        }

    };

})(module.exports);




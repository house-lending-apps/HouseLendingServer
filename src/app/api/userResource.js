'use strict';

(function (userResource) {
    var authService = require('./services/authService');


    /*
     * Healthcheck service
     */
    userResource.healthcheck = function (req, res) {
        console.log('Users API Healthcheck Successful');
        return res.status(200).json({message: 'Users API Healthcheck Successful'});
    };

    /**
     * authenticate
     */
    userResource.getUser = function (req, res) {
        console.log('Request to Get User Details for user : ' + req.query.user);

        if (!req.query.user) {
            return res.status(404).json({'error': 'unable to find user'});
        } else {
            var userDetails = {
                user: req.query.user
            };
            authService.findUser(userDetails).then(function(result) {
            //authService.findUserMocked(userDetails).then(function (result) {
                return res.status(200).json(result);
            }, function (error) {
                return res.status(500).json(error);
            });
        }
    };



    /** Add User **/
    userResource.addUser = function (req, res) {
        var users = req.body;
        var resultResp = {
            message: '',
            totalUsersInserted: 0
        };

        authService.addUser(users).then(function(result){
            resultResp.message = 'users added successfully';
            resultResp.totalUsersInserted = result.length;
            return res.status(200).json(resultResp);
        }, function(err){
            resultResp.message = 'Unable to add users';
            resultResp.dbErrorMessage = err;
            return res.status(500).json(resultResp);
        });
    };

})(module.exports);




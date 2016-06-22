'use strict';

(function (authService) {

    var databaseClient = require('../../core/databaseClient');
    var q = require('q');
    var table = 'users';

    var mockUser = {
        user: 'test@test.com',
        authenticated: true
    };

    // Authenticate user
    authService.find = function (userDetails) {
        var defer = q.defer();

        databaseClient.find(table, userDetails).then(function (result) {
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    };

    // Authenticate user
    authService.findMocked = function (userDetails) {
        var defer = q.defer();

        /*databaseClient.find(table, userDetails).then(function (result) {
         defer.resolve(result);
         }, function (error) {
         defer.reject(error);
         });*/

        setTimeout(function () {
            defer.resolve(mockUser);
        }, 500);

        return defer.promise;
    };

})(module.exports);


'use strict';

(function (authService) {

    var databaseClient = require('../../core/databaseClient');
    var q = require('q');
    var table = 'users';

    var mockUser = {
        user: 'test@test.com',
        userName: 'Test Test',
        authenticated: true
    };

    // Authenticate user
    authService.findUser = function (user) {
        var defer = q.defer();

        databaseClient.find(table, user).then(function (result) {
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    };

    // Authenticate user
    authService.findUserMocked = function (userDetails) {
        var defer = q.defer();

        setTimeout(function () {
            defer.resolve(mockUser);
        }, 500);

        return defer.promise;
    };

    // Add new user
    authService.addUser = function (users) {
        var defer = q.defer();

        databaseClient.insert(table, users).then(function (result) {
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    };

})(module.exports);


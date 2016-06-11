'use strict';

(function (userRoutes) {
    var userResource = require('../api/userResource');
    userRoutes.app = null;

    userRoutes.init = function (appMain) {
        var self = this;
        self.app = appMain;
        self.setRoutes();
    };

    userRoutes.setRoutes = function () {
        var self = this;

        self.app.route('/api/users')
            .head(userResource.healthcheck)
            .get(userResource.getUser)
            .post(userResource.addUser);
    };
})(module.exports);






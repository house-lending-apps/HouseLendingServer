'use strict';

(function (loginRoutes) {
    var authResource = require('../api/authResource');
    loginRoutes.app = null;

    loginRoutes.init = function (appMain) {
        var self = this;
        self.app = appMain;
        self.setRoutes();
    };

    loginRoutes.setRoutes = function () {
        var self = this;
        self.app.route('/api/authenticate')
            .head(authResource.healthcheck)
            .post(authResource.authenticate);
    };
})(module.exports);






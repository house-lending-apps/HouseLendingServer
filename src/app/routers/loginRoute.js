'use strict';

(function (loginRouter) {
    var authResource = require('../api/auth/authResource');
    loginRouter.app = null;

    loginRouter.init = function (appMain) {
        var self = this;
        self.app = appMain;
        self.setRoutes();
    };

    loginRouter.setRoutes = function () {
        var self = this;
        self.app.route('/api/authenticate')
            .head(authResource.healthcheck)
            .get(authResource.getUserDetails)
            .post(authResource.authenticate);
    };
})(module.exports);






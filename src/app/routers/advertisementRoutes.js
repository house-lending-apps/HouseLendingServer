'use strict';

(function (advertisementRoutes) {
    var advertisementResource = require('../api/advertisementResource');
    advertisementRoutes.app = null;

    advertisementRoutes.init = function (appMain) {
        var self = this;
        self.app = appMain;
        self.setRoutes();
    };

    advertisementRoutes.setRoutes = function () {
        var self = this;

        self.app.route('/api/advertisements')
            .head(advertisementResource.healthcheck)
            .get(advertisementResource.getAdvertisement)
            .post(advertisementResource.addAdvertisement);
    };
})(module.exports);






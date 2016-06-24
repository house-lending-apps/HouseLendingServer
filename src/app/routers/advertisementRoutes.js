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
            .get(advertisementResource.getAdvertisements)
            .post(advertisementResource.addAdvertisement);

        self.app.route('/api/advertisements/:id')
            .get(advertisementResource.getAdvertisement);

    };
})(module.exports);






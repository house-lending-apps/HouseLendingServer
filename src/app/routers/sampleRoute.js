(function (sampleRouter) {
    sampleRouter.app = null;
    var sampleResponse = {
        'status': '200',
        'message': 'found the resource'
    };

    sampleRouter.init = function (appMain) {
        var self = this;
        self.app = appMain;
        self.setRoutes();
    };

    sampleRouter.setRoutes = function () {
        var self = this;
        self.app.route('/')
            .get(function (req, res) {
                res.send(sampleResponse);
            });

        self.app.route('/about')
            .get(function (req, res) {
                res.send(sampleResponse);
            });
    };
})(module.exports);



(function (sampleRoutes) {
    sampleRoutes.app = null;
    var sampleResponse = {
        'status': '200',
        'message': 'found the resource'
    };

    sampleRoutes.init = function (appMain) {
        var self = this;
        self.app = appMain;
        self.setRoutes();
    };

    sampleRoutes.setRoutes = function () {
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



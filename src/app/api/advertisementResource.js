'use strict';

(function (advertisementResource) {
    var advertisementService = require('./services/advertisementService');


    /*
     * Healthcheck service
     */
    advertisementResource.healthcheck = function (req, res) {
        console.log('Advertisement API Healthcheck Successful');
        return res.status(200).json({message: 'Advertisement API Healthcheck Successful'});
    };

    /**
     * Get Advertisement
     */
    advertisementResource.getAdvertisement = function (req, res) {
        console.log('Request to Get Advertise Details for id : ' + req.query.id);

        if (!req.query.id) {
            return res.status(404).json({'error': 'unable to find user'});
        } else {
            var advertisementDetails = {
                id: req.query.id
            };
            advertisementService.find(advertisementDetails).then(function (result) {
                //advertisementService.findMocked(advertisementDetails).then(function(result) {
                return res.status(200).json(result);
            }, function (error) {
                return res.status(500).json(error);
            });
        }
    };


    /** Add Advertisement **/
    advertisementResource.addAdvertisement = function (req, res) {
        var advertisements = req.body;
        var resultResp = {
            message: '',
            totalRecordsInserted: 0
        };

        advertisementService.addAdvertise(advertisements).then(function (result) {
            resultResp.message = 'Advertisements added successfully';
            resultResp.totalRecordsInserted = result.length;
            return res.status(200).json(resultResp);
        }, function (err) {
            resultResp.message = 'Unable to add advertisements';
            resultResp.dbErrorMessage = err;
            return res.status(500).json(resultResp);
        });
    };

})(module.exports);




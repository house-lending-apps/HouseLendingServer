'use strict';

(function (advertisementService) {

    var databaseClient = require('../../core/databaseClient');
    var q = require('q');
    var table = 'advertisements';

    var mockAdvertisements = [{
        'id': '1',
        'title': 'Test1',
        'dateCreated': '28-05-2016 11:21:00',
        'advertisementDetails': 'This flat is very good with balcony',
        'property': {
            'address': {
                'addressLine1': 'Address Line 1',
                'addressLine2': 'Address Line 2',
                'postcode': '411046',
                'townOrTaluka': 'Chikli',
                'city': 'Pune',
                'state': 'Maharashtra',
                'country': 'India'
            },
            'bedRooms': 2,
            'bathRooms': 2,
            'superBuiltUpArea': 123.00,
            'buildUpArea': 150.00,
            'carpetArea': 150.00,
            'balconies': 1,
            'parkingReserved': 'Reserved Parking for one car and one bike',
            'floorNo': '5',
            'facingDirection': 'Garden Facing',
            'availableFrom': '29-05-2016',
            'propertyAge': '3 Years Old',
            'availableFor': 'Family Only',
            'propertyPhotos': [
                {
                    'googleMapUrl': '',
                    'photoURL': '',
                    'title': '',
                    'caption': ''
                }
            ]
        }
    },{
        'id': '2',
        'title': 'Test2',
        'dateCreated': '28-05-2016 11:21:00',
        'advertisementDetails': 'This flat is very good with balcony',
        'property': {
            'address': {
                'addressLine1': 'Address Line 1',
                'addressLine2': 'Address Line 2',
                'postcode': '411046',
                'townOrTaluka': 'Chikli',
                'city': 'Pune',
                'state': 'Maharashtra',
                'country': 'India'
            },
            'bedRooms': 2,
            'bathRooms': 2,
            'superBuiltUpArea': 123.00,
            'buildUpArea': 150.00,
            'carpetArea': 150.00,
            'balconies': 1,
            'parkingReserved': 'Reserved Parking for one car and one bike',
            'floorNo': '5',
            'facingDirection': 'Garden Facing',
            'availableFrom': '29-05-2016',
            'propertyAge': '3 Years Old',
            'availableFor': 'Family Only',
            'propertyPhotos': [
                {
                    'googleMapUrl': '',
                    'photoURL': '',
                    'title': '',
                    'caption': ''
                }
            ]
        }
    },
        {
            'id': '3',
            'title': 'Test3',
            'dateCreated': '28-05-2016 11:21:00',
            'advertisementDetails': 'This flat is very good with balcony',
            'property': {
                'address': {
                    'addressLine1': 'Address Line 1',
                    'addressLine2': 'Address Line 2',
                    'postcode': '411046',
                    'townOrTaluka': 'Chikli',
                    'city': 'Pune',
                    'state': 'Maharashtra',
                    'country': 'India'
                },
                'bedRooms': 2,
                'bathRooms': 2,
                'superBuiltUpArea': 123.00,
                'buildUpArea': 150.00,
                'carpetArea': 150.00,
                'balconies': 1,
                'parkingReserved': 'Reserved Parking for one car and one bike',
                'floorNo': '5',
                'facingDirection': 'Garden Facing',
                'availableFrom': '29-05-2016',
                'propertyAge': '3 Years Old',
                'availableFor': 'Family Only',
                'propertyPhotos': [
                    {
                        'googleMapUrl': '',
                        'photoURL': '',
                        'title': '',
                        'caption': ''
                    }
                ]
            }
        }];

    // Find Advertise
    advertisementService.find = function (advertiseDetails) {
        var defer = q.defer();

        databaseClient.find(table, advertiseDetails).then(function (result) {
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    };

    // Authenticate user
    advertisementService.findMocked = function (advertiseDetails) {
        var defer = q.defer();

        setTimeout(function () {
            defer.resolve(mockAdvertisements);
        }, 500);

        return defer.promise;
    };

    // Add new user
    advertisementService.addAdvertise = function (advertisements) {
        var defer = q.defer();

        databaseClient.insert(table, advertisements).then(function (result) {
            defer.resolve(result);
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    };

})(module.exports);


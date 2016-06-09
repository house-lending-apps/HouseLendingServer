(function (databaseClient) {
    var q = require('q');
    var _ = require('lodash');
    var mongoClient = require('mongodb').MongoClient;
    var connection = undefined;
    var mongodbURL = '';


    databaseClient.init = function (config) {
        mongodbURL = config.mongo - db - url;

    };

    var getConnection = function () {
        if (connection === undefined) {
            mongoClient.connect(mongodbURL, function (err, db) {
                //mongoClient.connect('mongodb://localhost:27017/house-lending', function(err, db) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                connection = db;
                return connection;
            });
        } else {
            return connection;
        }

    };

    // we should call this whenever application close
    var closeConnection = function () {
        connection.close();
        console.log('Connection to db closed');
    };


    // Exposing 4 methods to play around
    /*
     1.  Insert Data, Array etc
     2.  Update Data
     3.  find data Singular or Multiple Records
     4.  Delete data
     */

    databaseClient.insert = function (table, payload) {
        var db = getConnection();
        var collection = db.collection(table);
        var defer = q.defer();

        if (Array.isArray(payload)) {
            collection.insertMany(payload, function (err, result) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(result);
                }
            });
        } else {
            collection.insertOne(payload, function (err, result) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(result);
                }
            });
        }
        return defer.promise;
    };

    /** Update database **/
    databaseClient.update = function (table, searchFilter, updatedPayload) {
        var defer = q.defer();
        var db = getConnection();
        var collection = db.collection(table);

        collection.updateOne(
            searchFilter,
            updatedPayload,
            function (err, result) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(result);
                }
            });

        return defer.promise;
    };

    /** Find query to return data **/
    databaseClient.find = function (table, searchFilter) {
        var defer = q.defer();
        var db = getConnection();
        var collection = db.collection(table);

        var cursor = collection.find(searchFilter);
        var result = [];
        cursor.each(function (err, doc) {
            if (err) {

            } else {
                if (doc != null) {
                    result.push(doc);
                } else {

                }
            }
        });

        return result;
    };


    databaseClient.exit = function () {
        closeConnection();
    };


}(module.exports));



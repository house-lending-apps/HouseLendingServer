'use strict';

(function (databaseClient) {

    var q = require('q');
    var mongoClient = require('mongodb').MongoClient;

    var connection;
    var mongodbURL;

    var getConnection = function () {
        var defer = q.defer();

        if (connection === undefined) {
            mongoClient.connect(mongodbURL, function (err, db) {
                if (err) {
                    console.log(err);
                    defer.reject(err);
                }
                connection = db;
                defer.resolve(connection);
            });
        } else {
            defer.resolve(connection);
        }

        return defer.promise;
    };

    // we should call this whenever application close
    var closeConnection = function () {
        connection.close();
        console.log('Connection to db closed');
    };


    databaseClient.init = function (config) {
        if(process.env.MONGO_DB_URL && process.env.MONGO_DB_URL !== '') {
            mongodbURL = process.env.mongodbURL;
        } else {
            mongodbURL = config.mongo_db_url;
        }

        return true;
    };

    // Exposing 4 methods to play around
    /*
     1.  Insert Data, Array etc
     2.  Update Data
     3.  find data Singular or Multiple Records
     4.  Delete data
     */

    databaseClient.insert = function (table, payload) {
        var defer = q.defer();

        getConnection().then(function (db) {
            var collection = db.collection(table);

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

        }, function (err) {
            defer.reject(err);
        });

        return defer.promise;
    };

    /** Update database **/
    databaseClient.update = function (table, searchFilter, updatedPayload) {
        var defer = q.defer();

        getConnection().then(function (db) {
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

        }, function (err) {
            defer.reject(err);
        });


        return defer.promise;
    };

    /** Find query to return data **/
    databaseClient.find = function (table, searchFilter) {
        var defer = q.defer();

        getConnection().then(function (db) {
            var collection = db.collection(table);
            collection.find(searchFilter).toArray(function (err, docs) {
                if (err) {
                    defer.reject(err);
                } else {
                    defer.resolve(docs);
                }

            });
        }, function (err) {
            defer.reject(err);
        });
        return defer.promise;
    };

    /** Exit function - Close connection before exit **/
    databaseClient.exit = function () {
        closeConnection();
    };


})(module.exports);



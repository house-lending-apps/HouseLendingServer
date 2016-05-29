// Way 2: Exporting anonymous function
// module.exports = function() {
//}

// Way 4: EXPORT AN ANONYMOUS OBJECT
/*
 var Buz = function () {};

 Buz.prototype.log = function () {
 console.log('buz!');
 };

 module.exports = new Buz();
 */

(function(databaseClient){
    var mongoClient = require('mongodb').MongoClient;
    var connection = undefined;
    databaseClient.init = function(){

    };

    var getConnection = function(){
        if(connection === undefined){
            mongoClient.connect('mongodb://localhost:27017/house-lending', function(err, db) {
                if (err) {
                    console.log(err);
                    throw err;
                }
                connection = db;
                return connection;
            });
        } else {
            // using already available connection
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

    databaseClient.insertData = function(table, payload){
      var db = getConnection();
      var collection = db.collection(table);


      if(Array.isArray(payload)){
          collection.insertMany(payload, function(err, result){
              if (err) {
                  console.log(err);

              } else {

              }

          });

      } else {
          collection.insertOne(payload, function(err, result){

          });

      }

    };

    databaseClient.exit = function() {
      closeConnection();
    };





}(module.exports));



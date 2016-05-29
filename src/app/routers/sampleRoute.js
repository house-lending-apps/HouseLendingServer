var express = require('express');
var router = express.Router();

var sampleResponse = {
    'status':'200',
    'message':'found the resource'
};

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('{Time: ', Date.now() , ', request body : ' , req.body ,'} ');
    console.log('{Time: ', Date.now() , ', request paras : ',  JSON.stringify(req.params) ,'} ');

    /*if(req.cookies.userToken){
        next();
    }else {
        res.status('401').send({'message':'user Token is missing in the request'});
    }*/

    next();
});

// define the home page route
router.get('/', function(req, res) {
  //  res.send('Sample home page');
    res.send(sampleResponse);
});

// define the about route
router.get('/about', function(req, res) {
    //res.send('About Sample');
    res.json(sampleResponse);
});

module.exports = router;
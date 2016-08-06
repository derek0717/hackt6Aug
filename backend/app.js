var express = require('express');
var bodyParser = require('body-parser');
var api = require('./api');

var app = express(),
    router 	= express.Router();


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(router);

router.post('/addPin', api.addPin);
router.get('/getPins', api.getPins);
router.post('/getPinsByLocation', api.getPinsByLocation);
router.post('/getPinsByTag', api.getPinsByTag);
router.post('/likePin', api.likePin);
router.post('/unlikePin', api.unlikePin);

var server = require('http').createServer(app);
server.listen(80);
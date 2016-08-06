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


app.use(express.static('../frontend/live-build'));

router.post('/api/addPin', api.addPin);
router.get('/api/getPins', api.getPins);
router.post('/api/getPinsByLocation', api.getPinsByLocation);
router.post('/api/getPinsByTag', api.getPinsByTag);
router.post('/api/likePin', api.likePin);
router.post('/api/unlikePin', api.unlikePin);
router.get('/api/test', function (req, res, next) {
    res.status(200).send('Test success!!');
});

var server = require('http').createServer(app);
server.listen(80);
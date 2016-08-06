var express = require('express');
var bodyParser = require('body-parser');
var api = require('./api');

var app = express(),
    router 	= express.Router();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(router);

router.post('/addPin', api.addPin);
router.post('/getPins', api.getPins);
router.post('/getPinsByLocation', api.getPinsByLocation);
router.post('/getPinsByTag', api.getPinsByTag);
router.post('/likePin', api.likePin);
router.post('/unlikePin', api.unlikePin);

var server = require('http').createServer(app);
server.listen(8888);
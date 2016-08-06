var express = require('express');
var api = require('./api');

var app = express(),
    router 	= express.Router();
router.get('/:getPinList', api.getPinList);
router.get('/:getPinListByLocation', api.getPinListByLocation);
app.use(router);
var server = require('http').createServer(app);
server.listen(8888);
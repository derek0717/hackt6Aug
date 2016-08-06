var express = require('express');
var api = require('./api');

var app = express(),
    router 	= express.Router();
router.get('/:getPins', api.getPinList);
router.get('/:getPinsByLocation', api.getPinListByLocation);
router.post('/newPin', api.newPin)
app.use(router);
var server = require('http').createServer(app);
server.listen(8888);
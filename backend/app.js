var express = require('express');
var bodyParser = require('body-parser');
var api = require('./api');

var app = express(),
    router 	= express.Router();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(router);

router.get('/getPins', api.getPins);
router.post('/addPin', api.addPin);
router.post('/getPinsByTags', api.getPinsByTags);

var server = require('http').createServer(app);
server.listen(8888);
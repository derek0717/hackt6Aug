var express = require('express');
var bodyParser = require('body-parser');
var api = require('./api');
var config = require('./config');

var conf = config.getConfig();
var app = express();
var router = express.Router();

app.use(express.static('../frontend/live-build'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(router);

router.post('/api/addPin', api.addPin);
router.get('/api/getPins', api.getPins);
router.post('/api/getPinsByLocation', api.getPinsByLocation);
router.post('/api/getPinsByTag', api.getPinsByTag);
router.post('/api/likePin', api.likePin);
router.post('/api/unlikePin', api.unlikePin);

router.get('/api/createDB', api.createDB);
router.get('/api/test', function (req, res, next) {
    res.status(200).send('Test success!!');
});


var server = require('http').createServer(app);
server.listen(conf.port);
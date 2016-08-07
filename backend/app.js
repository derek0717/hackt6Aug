var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var api = require('./api');
var config = require('./config');

var conf = config.getConfig();
var app = express();
var router = express.Router();

mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/zuyin1');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


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

var server = require('http').createServer(app);
server.listen(conf.port);
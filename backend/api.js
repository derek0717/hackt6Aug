var db = require('./db');

module.exports.getPins = function (req, res, next) {
    console.log('get pin list request');
    console.log(req.query.lat);
       console.log(req.query.lon);
    res.status(200).send(req.params);
    };

module.exports.addPin = function (req, res, next) {
    console.log(req.body);
    res.status(200).send(req.body);
}
module.exports.getPinsByTags = function (req, res, next) {
    var params = rea.body;
    var tags = params.tags;
    var allPins = getAllPins();

    var resultPins = [];
    for (var i = 0; i < allPins.length; i++) {
        var pin = allPins[i];
        for (var j = 0; j < tags.length; j++) {
            var tag = tags[i];
            if (pin.tags.indexOf(tag) > -1) {
                resultTags.push(pin);
            }
        }
    }

    sendResult(resultPins);
};

function sendResult (res, result) {
    res.status(200).send(result);
}
function sendError (res, message) {
    res.status(500).send(message);
}
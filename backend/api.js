var db = require('./db');


module.exports.addPin = function (req, res, next) {
    var params = req.body;

    var pin = params.pin;

    db.addPin(pin).then(function (row) {
        console.log(row);
    }).fail(function (err) {
        console.log(err);
    });

};

module.exports.getPinsByLocation = function (req, res, next) {
    var params = rea.body;

    var location = params.location;
    var radius = params.radius;
    var allPins = getAllPins();

    var resultPins = [];
    for (var i = 0; i < allPins.length; i++) {
        var pin = allPins[i];
        var d = db2.getd(pinLocation, location); // wrong
        if (d <= radius) {
            resultPins.push(pin);
        }
    }

    sendResult(resultPins);
}
module.exports.getPinsByTag = function (req, res, next) {
    var params = rea.body;

    var tag = params.tag;
    var allPins = getAllPins();

    var resultPins = [];
    for (var i = 0; i < allPins.length; i++) {
        var pin = allPins[i];
        if (pin.tags.indexOf(tag) > -1) {
            resultPins.push(pin);
        }
    }

    sendResult(resultPins);
};
module.exports.likePin = function (req, res, next) {
    var params = rea.body;

    var userId = params.userId;
    var pinId = params.parId;

    db.addPinLike(pinId); // wrong

    sendResult(res);
}
module.exports.unlikePin = function (req, res, next) {
    var params = rea.body;

    var userId = params.userId;
    var pinId = params.parId;

    db.addPinUnlike(pinId); // wrong

    sendResult(res);
}

function sendResult (res, result = {}) {
    res.status(200).send(result);
}

function sendError (res, message = "") {
    res.status(500).send(message);
}
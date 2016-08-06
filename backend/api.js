var db = require('./db');


module.exports.addPin = function (req, res, next) {
    var params = req.body;

    var pin = params.pin;

    db.addPin(pin).then(function (row) {
        sendResult(resultPins);
    }).fail(function (err) {
        sendError(err);
    });
};

module.exports.getPinsByLocation = function (req, res, next) {
    var params = rea.body;

    var location = params.location;
    var radius = params.radius;

    db.getAllPins.then(function (allPins) {
        // var resultPins = [];
        // for (var i = 0; i < allPins.length; i++) {
        //     var pin = allPins[i];
        //     var d = db2.getd(pinLocation, location); // wrong
        //     if (d <= radius) {
        //         resultPins.push(pin);
        //     }
        // }
        // sendResult(resultPins);
        sendResult(allPins);
    }).fail(function (err) {
        sendError(err);
    });
}
module.exports.getPinsByTag = function (req, res, next) {
    var params = rea.body;

    var tag = params.tag;

    db.getAllPins.then(function (allPins) {
        var resultPins = [];
        for (var i = 0; i < allPins.length; i++) {
            var pin = allPins[i];
            if (pin.tags.indexOf(tag) > -1) {
                resultPins.push(pin);
            }
        }
        sendResult(resultPins);
    }).fail(function (err) {
        sendError(err);
    });
};
module.exports.likePin = function (req, res, next) {
    var params = rea.body;

    var userId = params.userId;
    var pinId = params.parId;

    db.addPinLike(pinId).then(function () {
        sendResult({});
    }).fail(function (err) {
        sendError(err);
    });
}
module.exports.unlikePin = function (req, res, next) {
    var params = rea.body;

    var userId = params.userId;
    var pinId = params.parId;

    db.addPinUnlike(pinId).then(function () {
        sendResult({});
    }).fail(function (err) {
        sendError(err);
    });
}

function sendResult (res, result) {
    res.status(200).send(result);
}

function sendError (res, message) {
    res.status(500).send(message);
}
var db = require('./db');
var utils = require('./utils');

module.exports.addPin = function (req, res, next) {
    var pin = req.body;
    if (checkPin(pin)) {
        db.addPin(pin).then(function (row) {
            sendResult(res, row.insertId);
        }).fail(function (err) {
            sendError(res, err);
        });
    }
    else {
        sendError(res, "bad pin");
    }
};

module.exports.getPins = function (req, res, next) {
    db.getPins().then(function (pins) {
        sendResult(res, getWorkingPins(pins));
    }).fail(function (err) {
        sendError(res, err);
    });
}

module.exports.getPinsByLocation = function (req, res, next) {
    var params = req.body;

    var location = params.location;
    var radius = params.radius;

    db.getPins().then(function (pins) {
        var resultPins = [];
        for (var i = 0; i < pins.length; i++) {
            var pin = pins[i];
            var d = utils.calculateCircleDistance(pin.location, location);
            if (d <= radius) {
                resultPins.push(pin);
            }
        }
        sendResult(res, getWorkingPins(resultPins));
    }).fail(function (err) {
        sendError(res, err);
    });
}
module.exports.getPinsByTag = function (req, res, next) {
    var tag = params.body;

    // db.getPinsByTag(tag).then(function (pins) {
    // 	sendResult(res, getWorkingPins(pins));
    // }).fail(function (err) {
    // 	sendError(res, err);
    // });
    db.getPins().then(function (pins) {
        var resultPins = [];
        for (var i = 0; i < pins.length; i++) {
            var pin = pins[i];
                resultPins.push(pin.tags.indexOf(tag));
            if (pin.tags.indexOf(tag) > -1) {
                resultPins.push(pin);
            }
        }
        sendResult(res, getWorkingPins(pins));
    }).fail(function (err) {
        sendError(res, err);
    });
};
module.exports.likePin = function (req, res, next) {
    var params = req.body;

    var userId = params.userId;
    var pinId = params.pinId;

    db.addPinLike(pinId).then(function () {
        sendResult(res, {});
    }).fail(function (err) {
        sendError(res, err);
    });
};
module.exports.unlikePin = function (req, res, next) {
    var params = req.body;

    var userId = params.userId;
    var pinId = params.pinId;

    db.addPinUnlike(pinId).then(function () {
        sendResult(res, {});
    }).fail(function (err) {
        sendError(res, err);
    });
};
module.exports.createDB = function (req, res, next) {
    db.createDB().then(function () {
        sendResult(res, "DB created");
    }).fail(function (err) {
        sendError(res, "DB not created:" + err);
    });
};
function sendResult(res, result) {
    res.status(200).send(result);
}
function sendError(res, message) {
    res.status(500).send(message);
}
function getWorkingPins(pins) {
    var workingPins = [];
    for (var i = 0; i < pins.length; i++) {
        var pin = pins[i];
        if (checkPin(pin)) {
            workingPins.push(pin);
        }
    }
    return workingPins;
}
function checkPin(pin) {
    return pin.userId
        && pin.title
        && pin.message
        && pin.location
        && pin.location.lat
        && pin.location.lon;
}
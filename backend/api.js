var db = require('./db');


module.exports.addPin = function (req, res, next) {
	var pin = req.body;

	db.addPin(pin).then(function (row) {
		sendResult(res, row.insertId);
	}).fail(function (err) {
		sendError(res, err);
	});
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
		// var resultPins = [];
		// for (var i = 0; i < allPins.length; i++) {
		//     var pin = allPins[i];
		//     var d = db2.getd(pinLocation, location); // wrong
		//     if (d <= radius) {
		//         resultPins.push(pin);
		//     }
		// }
		// sendResult(res, resultPins);
		sendResult(res, getWorkingPins(pins));
	}).fail(function (err) {
		sendError(res, err);
	});
}
module.exports.getPinsByTag = function (req, res, next) {
	var tag = params.body;
	
	db.getPinsByTag(tag).then(function (pins) {
		sendResult(res, getWorkingPins(pins));
	}).fail(function (err) {
		sendError(res, err);
	});
	// db.getPins().then(function (allPins) {
	//     var resultPins = [];
	//     for (var i = 0; i < allPins.length; i++) {
	//         var pin = allPins[i];
	//         if (pin.tags.indexOf(tag) > -1) {
	//             resultPins.push(pin);
	//         }
	//     }
	//     sendResult(res, resultPins);
	// }).fail(function (err) {
	//     sendError(res, err);
	// });
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

function sendResult (res, result) {
	res.status(200).send(result);
}
function sendError (res, message) {
	res.status(500).send(message);
}
function getWorkingPins (pins) {
	var workingPins = [];
	for (var i = 0; i < pins; i++) {
		var pin = pins[i];
		if (checkPin(pin)) {
			workingPins.push(pin);
		}
	}
	return workingPins;
}
function checkPin(pin) {
	return pin.userId
		&& pin.message
		&& pin.message
		&& pin.location
		&& pin.location.lat
		&& pin.location.lon;
}
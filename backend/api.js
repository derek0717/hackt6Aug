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
    console.log(db.getAllPins()[0]);
    res.status(200).send(req.body);
    // var params = rea.params; // wrong
    // var tags = params.tags;
    // var pins = getAllPins();

    // var resultTags = [];
    // for (var i = 0; i < pins.length; i++) {
    //     var pin = pins[i];
    //     for (var j = 0; j < tags.length; j++) {
    //         var tag = tags[i];
    //         if (pin.tags.indexOf(tag) > -1) {
    //             resultTags.push(pin);
    //         }
    //     }
    // }
};
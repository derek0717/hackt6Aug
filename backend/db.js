var Q = require('q');
var mongoose = require('mongoose');

var pinSchema = new mongoose.Schema({
    title: {
        type: String,
        index: false
    },
    message: {
        type: String,
        index: false
    },
    location: {
        lat: {
            type: String,
            index: false
        },
        lon: {
            type: String,
            index: false
        }
    },
    tags: {
        type: Array,
        index: false
    },
    userId: {
        type: Number,
        index: false
    }
});

module.exports.addPin = function (pin) {

    var deferred = Q.defer();
    var model = mongoose.model('pins', pinSchema);
    var newModel = new model(pin);

    newModel.save(function (err, saved) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve();
        }
    });

    return deferred.promise;
};


module.exports.getPins = function () {
    var deferred = Q.defer();

    var model = mongoose.model('pins', pinSchema);
    model.find({}, function (err, res) {
        if (err) {
            deferred.reject();
        } else {
            if (res) {
                deferred.resolve(res);
            }
            else {
                deferred.reject();
            }
        }
    });
    return deferred.promise;
};


module.exports.getPinsByTag = function (tag) {

    var deferred = Q.defer();


    return deferred.promise;
};



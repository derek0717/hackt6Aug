var Q = require('q');
var mongoose = require('mongoose');
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;

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
            type: SchemaTypes.Double,
            index: false
        },
        lon: {
            type: SchemaTypes.Double,
            index: false
        }
    },
    tags: {
        type: Array,
        index: false
    },
    userId: {
        type: String,
        index: false
    },
    likes: {
        type: Number,
        index: false
    },
    dislikes: {
        type: Number,
        index: false
    }
});

module.exports.addPin = function (pin) {

    pin.likes = 0;
    pin.dislikes = 0;

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

function modifyLikes(pinId, obj) {
    var deferred = Q.defer();
    var model = mongoose.model('pins', pinSchema);
    var res = model.update(
        {_id: pinId},
        {$inc: obj}, function (err, doc) {
            if (err) {
                deferred.reject();
            } else {
                deferred.resolve();
            }
        }
    );
    return deferred.promise;
}

module.exports.likePin = function (pinId) {
    return modifyLikes(pinId, { likes: 1 });
};

module.exports.unlikePin = function (pinId) {
    return modifyLikes(pinId, { dislikes: 1 });
};



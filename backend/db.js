var Q = require('q');
var Client = require('mariasql');

module.exports.addPin = function (pin) {

    var deferred = Q.defer();
    
    execute('INSERT INTO pin (title, name, userId, lat, lon) ' +
        'VALUES (:title, :name, : userId, :lat, :lon)',
        {name: pin.name},
        function (err, rows) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(rows);
            }
        });

    return deferred.promise;
};

module.exports.getPins = function () {

    var deferred = Q.defer();

    getAllPins(function (err, rows) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(rows);
        }
    });

    return deferred.promise;
};


module.exports.getPinsByTag = function (tag) {

    var deferred = Q.defer();

    getAllPins(function (err, rows) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(rows);
        }
    });
    
    

    return deferred.promise;
};

function getTags() {
    
}

function getAllPins(cb) {
    return execute('SELECT ' +
        'pin.id, ' +
        'pin.title, ' +
        'pin.message, ' +
        'pin.userId, ' +
        'pin.lat, ' +
        'pin.lon ' +
        'FROM pin', cb);
}

function execute(query, param, cb) {
    c = connect();
    c.query(query, param, cb);
    c.end();
}

function execute(query, cb) {
    c = connect();
    c.query(query, cb);
    c.end();
}

function connect() {
    var c = new Client();
    c.connect({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        db: 'zuyin'
    });
    c.on('connect', function () {
        console.log('Client connected');
    })
        .on('error', function (err) {
            console.log('Client error: ' + err);
        })
        .on('close', function (hadError) {
            console.log('Client closed');
        });
    return c;
}
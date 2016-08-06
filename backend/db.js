var Q = require('q');
var Client = require('mariasql');
var config = require('./config');


module.exports.addPin = function (pin) {

    var deferred = Q.defer();

    executeParam('INSERT INTO pin (title, message, lat, lon, userId) ' +
        'VALUES (:title, :message, :lat, :lon, :userId)',
        {
            title: pin.title,
            message: pin.message,
            lat: pin.location.lat,
            lon: pin.location.lon,
            userId: pin.userId
        },
        function (err, rows) {
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

    getAllPins(function (err, rows) {
        if (err) {
            deferred.reject(err);
        } else {
            var pins = [];
            for (var i = 0; i < rows.length; i++) {
                pins.push(createPin(rows[i]));
            }
            deferred.resolve(pins);
        }
    });

    return deferred.promise;
};


module.exports.getPinsByTag = function (tag) {

    var deferred = Q.defer();

    execute('SELECT ' +
        'pin.id, ' +
        'pin.title, ' +
        'pin.message, ' +
        'pin.userId, ' +
        'pin.lat, ' +
        'pin.lon ' +
        'FROM pin', function (err, rows) {
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

function executeParam(query, param, cb) {
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


    var conf = config.getConfig();

    c.connect({
        host: conf.dbHost,
        user: conf.dbUser,
        password: conf.dbPass,
        db: conf.dbName
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

function createPin(row) {
    var pin = {};

    pin.title = row.title;
    pin.message = row.message;
    pin.location = {lat: parseInt(row.lat), lon: parseInt(row.lon)};
    pin.tags = [];
    pin.userId = row.userId;

    return pin;
}

module.exports.createDB = function () {
    var conf = config.getConfig();
    var deferred = Q.defer();

    var c = new Client();
    c.connect({
        host: conf.dbHost,
        user: conf.dbUser,
        password: conf.dbPass
    });


    c.query("CREATE DATABASE IF NOT EXISTS " + conf.dbName + ";", function (err, rows) {
        if (err) {
            c.end();
            deferred.reject(err);
        } else {
            c.end();

            var d = new Client();
            d.connect({
                host: conf.dbHost,
                user: conf.dbUser,
                password: conf.dbPass,
                db: conf.dbName
            });

            d.query("CREATE TABLE IF NOT EXISTS pin (" +
                "id int(11) NOT NULL AUTO_INCREMENT, " +
                "title varchar(50), " +
                "message varchar(512), " +
                "userId int(11), " +
                "lat DOUBLE, " +
                "lon DOUBLE, " +
                "PRIMARY KEY (id)) ENGINE=InnoDB  DEFAULT CHARSET=utf8;", function (err, rows) {
                if (err) {
                    d.end();
                    deferred.reject(err);
                } else {
                    d.query("CREATE TABLE IF NOT EXISTS tag (" +
                        "id int(11) NOT NULL AUTO_INCREMENT, " +
                        "name varchar(100), " +
                        "PRIMARY KEY (id)) ENGINE=InnoDB  DEFAULT CHARSET=utf8;", function (err, rows) {
                        if (err) {
                            d.end();
                            deferred.reject(err);
                        } else {
                            d.query("CREATE TABLE IF NOT EXISTS pin_tag (" +
                                "pinId int(11), " +
                                "tagId int(11) " +
                                ") ENGINE=InnoDB  DEFAULT CHARSET=utf8;", function (err, rows) {
                                if (err) {
                                    d.end();
                                    deferred.reject(err);
                                } else {
                                    d.query("CREATE TABLE IF NOT EXISTS user (" +
                                        "id int(11) NOT NULL AUTO_INCREMENT, " +
                                        "name varchar(100), " +
                                        "passwordHash char(32), " +
                                        "PRIMARY KEY (id)) ENGINE=InnoDB  DEFAULT CHARSET=utf8;", function (err, rows) {
                                        if (err) {
                                            d.end();
                                            deferred.reject(err);
                                        } else {
                                            d.end();
                                            deferred.resolve(rows);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });

    return deferred.promise;
};


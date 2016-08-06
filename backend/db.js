var Q = require('q');
var Client = require('mariasql');

module.exports.addPin = function (pin) {

    var deferred = Q.defer();

    console.log('insert pin name:' + pin.name);


    execute('INSERT INTO pin (name) VALUES (:name)', {name: pin.name},
        function (err, rows) {
            if (err)
                throw err;
            deferred.resolve(rows);
        });


    return deferred.promise;
};

module.exports.addPin1 = function (pin) {

    var deferred = Q.defer();


    execute('SELECT * FROM pin WHERE id = :id', {id: 1},
        function (err, rows) {
            if (err)
                throw err;
            deferred.resolve(rows);
        });


    return deferred.promise;
};

function execute(query, param, cb) {

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

    c.query(query, param, cb);
    c.end();
}
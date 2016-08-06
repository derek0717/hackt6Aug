
var inspect = require('util').inspect;
var Q = require('q');
var Client = require('mariasql');




module.exports.addPin = function (pin) {

    var deferred = Q.defer();

    var c = new Client();
    c.connect({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        db: 'zuyin'
    });



    c.on('connect', function() {
        console.log('Client connected');
    })
        .on('error', function(err) {
            console.log('Client error: ' + err);
        })
        .on('close', function(hadError) {
            console.log('Client closed');
        });

    c.query('SELECT * FROM pin WHERE id = :id',
        { id: 1 },
        function(err, rows) {
            if (err)
                throw err;
            console.dir(rows);
            deferred.resolve(rows);
        });


    c.end();



    return deferred.promise;
};
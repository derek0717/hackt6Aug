
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

    var pq = c.prepare('SELECT * FROM pin WHERE id = :id');

    c.query(pq({ id: 1}))
        .on('result', function(res) {
            res.on('row', function(row) {
                deferred.resolve(row);
                console.log('Result row: ' + inspect(row));
            })
                .on('error', function(err) {
                    console.log('Result error: ' + inspect(err));
                    deferred.reject(err);
                })
                .on('end', function(info) {
                    console.log('Result finished successfully');
                    deferred.reject(info);
                });
        })
        .on('end', function() {
            console.log('Done with all results');
        });

    c.end();




    return deferred.promise;
};
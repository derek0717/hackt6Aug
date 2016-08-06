module.exports.getConfig = function () {
    var isLive = true;
    if (isLive) {
        return {
            "port": 80,
            "dbHost": "127.0.0.1",
            "dbUser": "root",
            "dbPass": "toor",
            "dbName":"zuyin"
        };
    }
    else {
        return {
            "port": 8888,
            "dbHost": "192.168.11.179",
            "dbUser": "root",
            "dbPass": "toor",
            "dbName":"zuyin"
        }
    }
};
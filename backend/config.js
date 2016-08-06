const os = require("os");

module.exports.getConfig = function () {
    if (os.type() == "Linux") {
        return {
            "port": 80
        };
    }
    else {
        return {
            "port": 8888
        }
    }
};
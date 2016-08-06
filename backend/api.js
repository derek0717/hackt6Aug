module.exports.getPins = function (req, res, next) {
   
console.log('get pin list request');
console.log(req);
var respo = {

}
res.status(200).send("JSON.stringify(res)");
};

module.exports.addPin = function (req, res, next) {
console.log(req.params);
res.status(200).send("JSON.stringify(res)");
};



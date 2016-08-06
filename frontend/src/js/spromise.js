var testThePins

var theMainURL = "http://192.168.11.179:8888";
// -> /getPins returns an array of pins

function get(url) {

	return new Promise(function(resolve, reject) {

		var req = new XMLHttpRequest();

		req.open('GET', url);

//		req.setRequestHeader('Access-Control-Allow-Headers', '*');
//		req.setRequestHeader("Access-Control-Allow-Origin", "*");

		req.onload = function() {
			// This is called even on 404 etc
			// so check the status
			if (req.status == 200/* || req.status == 304*/) {
				// Resolve the promise with the response text
				resolve(req.response);
			}
			else {
				// Otherwise reject with the status text
				// which will hopefully be a meaningful error
				reject(Error(req.statusText));
			}
		};

		// Handle network errors
		req.onerror = function() {
			reject(Error("Network Error"));
		};

		// Make the request
		req.send();
	});
}

function push(url) {
	return new Promise(function(resolve, reject) {

		var req = new XMLHttpRequest();
		req.open('GET', theMainURL+'/addPin');
		req.send(JSON.stringify(testThePins));
	});
}


get(theMainURL+'/getPins').then(JSON.parse).then(function (response) {
	var localJSON = response;
	testThePins = response; // for testing only
//	console.log(localJSON);
	readJsonAndCreateAllPins(response);
});

function addtoJSON () {

};

//get('database/testing.json').then(function(response) {
//  console.log("Success!", response);
//}, function(error) {
//  console.error("Failed!", error);
//});

$(document).on("keypress", function (e) {
		console.log(e.which);
		switch(e.which) {
			case 112:

						break;
			default:
		}
})

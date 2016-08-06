function get(url) {

	return new Promise(function(resolve, reject) {

		var req = new XMLHttpRequest();
		req.open('GET', url);

		req.onload = function() {
			// This is called even on 404 etc
			// so check the status
			if (req.status == 200) {
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

//FOR TESTING
var stringifyPins;
var parsePins;

function createPinsTest(testing) {
		for (var i = 0; i < testing.length; i++) {
				console.log(testing[i]);
		}
}

get('database/testing.json').then(JSON.stringify).then(function (response) {
		console.log(response);
		stringifyPins = response
		return response;
}).then(JSON.parse).then(function (response) {
		createPinsTest(response);
		parsePins = response;
});

//get('database/testing.json').then(function(response) {
//  console.log("Success!", response);
//}, function(error) {
//  console.error("Failed!", error);
//});

/*
var testPins = [
		{"title":"title1", "message":"some text here.","location":{"lat":22.283636353214973,"lon":114.1349458694458},"tags":["A","B","C"],"user_id":"user1"},
		{"title":"this is a title", "message":"Doe","location":{"lat":22.280181510711184,"lon":114.15121078491211},"tags":["A","B","C"],"user_id":"user1"},
		{"title":"John", "message":"Doe","location":{"lat":22.290545782110424,"lon":114.14709091186523},"tags":["A","B","C"],"user_id":"user2"},
]

var testString = JSON.stringify(testPins);
*/

var pinsObject;

var theMainURL = "http://192.168.11.179:8888";
// -> /getPins returns an array of pins
var getLocalPins = '/database/testing.json';

function get(url) {

	return new Promise(function(resolve, reject) {

		var req = new XMLHttpRequest();

		req.open('GET', url);

//		req.setRequestHeader('Access-Control-Allow-Headers', '*');
//		req.setRequestHeader("Access-Control-Allow-Origin", "*");

		req.onload = function() {
			// This is called even on 404 etc
			// so check the status
			if (req.status == 200 || req.status == 304) {
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


get(theMainURL+'/getPins').then(JSON.parse).then(function (response) {
	var localJSON = response;
//	console.log(localJSON);
	readJsonAndCreateAllPins(response);
});

//get('database/testing.json').then(function(response) {
//  console.log("Success!", response);
//}, function(error) {
//  console.error("Failed!", error);
//});

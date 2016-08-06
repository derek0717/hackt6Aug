var testThePins

var testPin1 = {"title":"title1", "message":"some text here.","location":{"lat":22.283636353214973,"lon":114.1349458694458},"tags":["A","B","C"],"user_id":"user1"};
/*
	{"title":"title1", "message":"some text here.","location":{"lat":22.283636353214973,"lon":114.1349458694458},"tags":["A","B","C"],"user_id":"user1"},
		{"title":"this is a title", "message":"Doe","location":{"lat":22.280181510711184,"lon":114.15121078491211},"tags":["A","B","C"],"user_id":"user1"},
		{"title":"John", "message":"Doe","location":{"lat":22.290545782110424,"lon":114.14709091186523},"tags":["A","B","C"],"user_id":"user2"},*/

var theMainURL = "/api";
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

function push(stringifiedJSON) {
	return new Promise(function(resolve, reject) {

		var req = new XMLHttpRequest();
		req.open('PUSH', theMainURL+'/addPin');

		req.send(stringifiedJSON);
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
//		console.log(e.which);
		switch(e.which) {
			case 112:
						push(testPin1);
						break;
			default:
		}
})





///FORM SUBMISSION
//
//hides form if clicked outside form
$('#formBackground').on('click', function (e) {toggleFormView()});

function toggleFormView () {
	$('#addPinFormWrap').toggleClass('hide');
	$('#formBackground').toggleClass('hide');
}


function addPinFormPopUp (Lat, Lon) {
	toggleFormView();
	$('#newPinButton').on('click', function (e) {

		var Tags = $('#newPinFormTags').value;
		var tagsArray = Tags.split(',');
		console.log(tagsArray + "  |  " + Tags);
		var json = {
					"title": $('#newPinFormTitle').value,
					"message": $('#newPinFormMessage').value,
					"location": {"lat":Lat,"lon":Lon},
					"tags": tagsArray,
					"user_id": "test-user1" //MUST BE CHANGED WITH USER ID
			};

			console.log(json);
		});
		toggleFormView();
};

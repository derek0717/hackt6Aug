

var testPin1 = {"title":"title1", "message":"some text here.","location":{"lat":22.283636353214973,"lon":114.1349458694458},"tags":["A","B","C"],"user_id":"user1"};


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
			if (req.status == 200/* || req.status == 304*/) {
				// Resolve the promise with the response text
				resolve(req.response);
			}
			else {
				// Otherwise reject with the status text
				// which will hopefully be a meaningful error
				reject(Error(req.statusText));
			}


		// Handle network errors
		req.onerror = function() {
			reject(Error("Network Error"));
		};

		// Make the request
		req.send(stringifiedJSON);
	});
}


get(theMainURL+'/getPins').then(JSON.parse).then(function (response) {
	var localJSON = response;
	testThePins = response; // for testing only
	console.log(localJSON);
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
$('#formBackground').on('click', function (e) {
	$('#addPinFormWrap').addClass('hide');
	$('#formBackground').addClass('hide');
});

function toggleFormView() {
	$('#addPinFormWrap').toggleClass('hide');
	$('#formBackground').toggleClass('hide');
};


function addPinFormPopUp (Lat, Lon) {
	$('#addPinFormWrap').removeClass('hide');
	$('#formBackground').removeClass('hide');
	$('#newPinButton').on('click', function (e) {

		var Tags = $('#newPinFormTags').val();
		var tagsArray = Tags.split(',');
		var json = {
					"title": $('#newPinFormTitle').val(),
					"message": $('#newPinFormMessage').val(),
					"location": {"lat":Lat,"lon":Lon},
					"tags": tagsArray,
					"user_id": $('#newPinFormID').val() //MUST BE CHANGED WITH USER ID
			};
			$('#addPinFormWrap').addClass('hide');
			$('#formBackground').addClass('hide');
			$('#newPinFormTags').val('');
			$('#newPinFormTitle').val('');
			$('#newPinFormMessage').val('')
//			console.log(json);
			//push(JSON.stringify(json));
			GlobalPinsJSON.push(json);
			addPinFromJSON(json);
		});
};

///FOR DEV OF PINS
//
$('#betaTestImg').on('click', function () {
	$('#betaTestFieldWrap').toggleClass('visible');
})

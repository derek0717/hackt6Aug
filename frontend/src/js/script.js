var GlobalPinsJSON=[];

//CUSTOM MARKER CODE (FROM GITHUB)
function CustomMarker(latlng, map, args) {
	this.latlng = latlng;
	this.args = args;
	this.setMap(map);
}

CustomMarker.prototype = new google.maps.OverlayView();

CustomMarker.prototype.draw = function() {

	var self = this;

	var div = this.div;

	if (!div) {

		div = this.div = document.createElement('div');

		div.className = 'pin tag1';
		div.style.position = 'absolute';

		if (typeof(self.args.user_id) !== 'undefined') {
			div.dataset.user_id = self.args.user_id;
		}
		if (typeof(self.args.title) !== 'undefined') {
			div.dataset.title = self.args.title;
		}
		if (typeof(self.args.message) !== 'undefined') {
			div.dataset.message = self.args.message;
		}
		if (typeof(self.args.lat) !== 'undefined') {
			div.dataset.lat = self.args.lat;
		}
		if (typeof(self.args.lon) !== 'undefined') {
			div.dataset.lon = self.args.lon;
		}
		var userIdThing;
		if (typeof(self.args.user_id) !== 'undefined') {
			div.dataset.user_id = self.args.user_id;
			userIdThing=self.args.user_id;
		}

		google.maps.event.addDomListener(div, "click", function(event) {
			//google.maps.event.trigger(self, "click");
			event.stopPropagation();
			showPinMessage(this);
		});

		this.div.innerHTML="<div><img src='images/"+userIdThing+".jpg' alt='' onerror='this.src=\'images/undefined.jpg\''></img></div>";

		var panes = this.getPanes();
		panes.overlayImage.appendChild(div);
	}

	var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

	if (point) {
		div.style.left = point.x + 'px';
		div.style.top = point.y + 'px';
	}
};

CustomMarker.prototype.remove = function() {
	if (this.div) {
		this.div.parentNode.removeChild(this.div);
		this.div = null;
	}
};

CustomMarker.prototype.getPosition = function() {
	return this.latlng;
};
/****/

var map;
/*var dummyPins={"pins":[
		{"title":"title1", "message":"some text here.","location":{"lat":22.283636353214973,"lon":114.1349458694458},"tags":["A","B","C"],"user_id":"user1"},
		{"title":"this is a title", "message":"Doe","location":{"lat":22.280181510711184,"lon":114.15121078491211},"tags":["A","B","C"],"user_id":"user1"},
		{"title":"John", "message":"Doe","location":{"lat":22.290545782110424,"lon":114.14709091186523},"tags":["A","B","C"],"user_id":"user2"},
]};*/

//LOAD CURRENT POSITION
function getLocation() {
		if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition,showError);
		} else {
				console.log = "Geolocation is not supported by this browser.";
		}
		console.log("grabbing location");
}
function showError(error) {
		switch(error.code) {
				case error.PERMISSION_DENIED:
						alert("User denied the request for Geolocation.");
						break;
				case error.POSITION_UNAVAILABLE:
						alert("Location information is unavailable.");
						break;
				case error.TIMEOUT:
						alert("The request to get user location timed out.");
						break;
				case error.UNKNOWN_ERROR:
						alert("An unknown error occurred.");
						break;
		}
}

//SHOW CURRENT POSITION
function showPosition(position) {
		console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);

	var myLatlng=new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	var marker = new google.maps.Marker({
		position: myLatlng,
		title:"you are here",
		icon:"images/loc.png"
	});
	marker.setMap(map);
	map.panTo(position);

}

//Add new pin
function addPin(lat,lon) {
		console.log("Add pin: Latitude: " + lat + " Longitude: " + lon);

	var myLatlng=new google.maps.LatLng(lat,lon);

	var overlay = new CustomMarker(
		myLatlng,
		map,
		{
			pin_id: '123',
			title: 'Red title',
			message: 'this is a message',
			lat:lat,
			lon:lon
		}
	);
}

function addPinFromJSON(singlePin) {
	//console.log("Add pin: Latitude: " + lat + " Longitude: " + lon);
	var myLatlng=new google.maps.LatLng(singlePin.location.lat,singlePin.location.lon);

	//var myLatlng=new google.maps.LatLng(22.283636353214973,114.1349458694458);
	var overlay = new CustomMarker(
		myLatlng,
		map,
		{
			user_id: ''+singlePin.user_id+'',
			title: ''+singlePin.title+'',
			message: ''+singlePin.message+'',
			lat:singlePin.location.lat,
			lon:singlePin.location.lon
		}
	);
	overlay.addListener('click', function(e) {
		markerClick(this.LatLng);
	});
}
//SHOW PIN MESSAGE
function showPinMessage(theDiv){
	var thisTitle=$(theDiv).data("title");
	var thisMessage=$(theDiv).data("message");
	var thisLat=$(theDiv).data("lat");
	var thisLon=$(theDiv).data("lon");

	map.panTo(new google.maps.LatLng(thisLat, thisLon));
	google.maps.event.addListenerOnce(map, 'idle', function(){
		console.log(thisTitle+" "+thisMessage);
		console.log(theDiv);
		//console.log(event);
		var popup=$("#popup-wrap")
		$(popup).find(".popup-title").text(thisTitle);
		$(popup).find(".popup-message").text(thisMessage);
		$("#popup-wrap").fadeIn();
	});
}
$("#popup-wrap").on("click",function(){$(this).fadeOut()});

var lastAddedPin;
//place marker on map; gets called by click event
function placeMarker(position) {
	if (lastAddedPin!=undefined) lastAddedPin.setMap(null);
	var marker = new google.maps.Marker({
		position: position,
		map: map,
		icon:'images/icon.png'
	});
	lastAddedPin=marker;
	map.panTo(position);
	google.maps.event.addListenerOnce(map, 'idle', function(){
			console.log('this logs after the panTo finishes.');
			//CALL POPUP FORM HERE
		addPinFormPopUp(position.lat(),position.lng());
	});


	/*
	marker.addListener('click', function(e) {
		markerClick(this.LatLng);
	});

	var overlay = new CustomMarker(
		position,
		map,
		{
			pin_id: '123',
			title: 'Red title',
			message: 'this is a message'
		}
	);
	overlay.addListener('click', function(e) {
		markerClick(this.LatLng);
	});
	*/
}

//
function markerClick(latLng){
	console.log("click");
}

//READ JSON AND CREATE ALL PINS
function readJsonAndCreateAllPins(justThePins){
	for(var i=0,l=justThePins.length;i<l;i++) {
			 //console.log(d[i].location);
			 //addNewPin(justThePins[i].location.lat,justThePins[i].location.lon);
			 addPinFromJSON(justThePins[i]);
		}
}

//MAP INITIALIZATION
function initialize() {
	var mapProp = {
		center:new google.maps.LatLng(22.286918099999998,114.1494163),
		zoom:15,
		disableDefaultUI:true,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

	google.maps.event.addListener(map, 'click', function(e) {
		placeMarker(e.latLng, map);
	});
	getLocation();
}
google.maps.event.addDomListener(window, 'load', initialize);

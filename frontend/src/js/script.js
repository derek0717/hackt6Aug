
var map;

/*var dummyPins={"pins":[
		{"title":"title1", "message":"some text here.","location":{"lat":22.283636353214973,"lon":114.1349458694458},"tags":["A","B","C"],"user_id":"user1"},
		{"title":"this is a title", "message":"Doe","location":{"lat":22.280181510711184,"lon":114.15121078491211},"tags":["A","B","C"],"user_id":"user1"},
		{"title":"John", "message":"Doe","location":{"lat":22.290545782110424,"lon":114.14709091186523},"tags":["A","B","C"],"user_id":"user2"},
]};*/
//LOAD CURRENT POSITION
function getLocation() {
		if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition);
		} else {
				console.log = "Geolocation is not supported by this browser.";
		}
		console.log("grabbing location");
}

//SHOW CURRENT POSITION
function showPosition(position) {
		console.log("Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude);

	var myLatlng=new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	var marker = new google.maps.Marker({
		position: myLatlng,
		title:"Hello World!",
		icon:"images/icon.png"
	});

	marker.setMap(map);
}

//Add new pin
function addNewPin(lat,lon) {
		console.log("Add pin: Latitude: " + lat + " Longitude: " + lon);

	var myLatlng=new google.maps.LatLng(lat,lon);

	var marker = new google.maps.Marker({
		position: myLatlng,
		title:"added pin"
	});

	marker.setMap(map);

}

//place marker on map; gets called by click event
	function placeMarker(position) {
		var marker = new google.maps.Marker({
			position: position,
			map: map
		});
		//map.panTo(position);
	}

//READ JSON AND CREATE ALL PINS
function readJsonAndCreateAllPins(x){
	justThePins=x.pins;
	for(var i=0,l=justThePins.length;i<l;i++) {
			 //console.log(d[i].location);
			 addNewPin(justThePins[i].location.lat,justThePins[i].location.lon);
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
}
google.maps.event.addDomListener(window, 'load', initialize);

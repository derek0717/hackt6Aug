
var map;
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
    console.log("Latitude: " + lat + " Longitude: " + lon);

  var myLatlng=new google.maps.LatLng(lat,lon);

  var marker = new google.maps.Marker({
    position: myLatlng,
    title:"added pin"
  });

  marker.setMap(map);

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

}
google.maps.event.addDomListener(window, 'load', initialize);

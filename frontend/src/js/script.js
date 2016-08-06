function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
    var x = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
    console.log(x);
}
function initialize() {
  var mapProp = {
    center:new google.maps.LatLng(22.286918099999998,114.1494163),
    zoom:15,
    disableDefaultUI:true,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
google.maps.event.addDomListener(window, 'load', initialize);

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
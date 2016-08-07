var GlobalPinsJSON = [];

var map;
/*var dummyPins={"pins":[
 {"title":"title1", "message":"some text here.","location":{"lat":22.283636353214973,"lon":114.1349458694458},"tags":["A","B","C"],"user_id":"user1"},
 {"title":"this is a title", "message":"Doe","location":{"lat":22.280181510711184,"lon":114.15121078491211},"tags":["A","B","C"],"user_id":"user1"},
 {"title":"John", "message":"Doe","location":{"lat":22.290545782110424,"lon":114.14709091186523},"tags":["A","B","C"],"user_id":"user2"},
 ]};*/

//LOAD CURRENT POSITION
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log = "Geolocation is not supported by this browser.";
    }
    console.log("grabbing location");
}
function showError(error) {
    switch (error.code) {
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

    var myLatlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var marker = new google.maps.Marker({
        position: myLatlng,
        title: "you are here",
        icon: "images/loc.png"
    });
    marker.setMap(map);
    map.panTo(position);

}

//Add new pin
/*function addPin(lat,lon) {
 console.log("Add pin: Latitude: " + lat + " Longitude: " + lon);

 var myLatlng=new google.maps.LatLng(lat,lon);

 var marker = new google.maps.Marker(
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
 }*/

function addPinFromJSON(singlePin) {

    console.log(singlePin);

    //console.log("Add pin: Latitude: " + lat + " Longitude: " + lon);
    var myLatlng = new google.maps.LatLng(singlePin.location.lat, singlePin.location.lon);

    //customized marker for demo purpose
    var theseTags = singlePin.tags;
    var gotResult = false, color = "3";
    for (var i = 0, j = theseTags.length; i < j; i++) {
        switch (theseTags[i]) {
            case("food"):
                color = "1";
                gotResult = true;
                break;
            case("wildlife"):
                color = "2";
                gotResult = true;
                break;
            case("hackathons"):
                color = "4";
                gotResult = true;
                break;
            case("events"):
                color = "3";
                gotResult = true;
                break;
            default:
                ;
        }
        if (gotResult) break;
    }
    switch (singlePin.userId) {
        case("user1"):
            color = color + "" + 1;
            break;
        case("user2"):
            color = color + "" + 2;
            break;
        case("user3"):
            color = color + "" + 3;
            break;
        default:
            color = color + "" + 0;
    }

    var imagePath = "images/" + color + ".png";

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: imagePath
    });
    var j = {
        "userId": singlePin.userId,
        "title": singlePin.title,
        "message": singlePin.message,
        "lat": singlePin.location.lat,
        "lon": singlePin.location.lon
    };
    marker.addListener('click', function (e) {
        showPinMessage(j);
    });
}
//SHOW PIN MESSAGE
function showPinMessage(j) {
    console.log("click");
    map.panTo(new google.maps.LatLng(j.lat, j.lon));
    //google.maps.event.addListenerOnce(map, 'idle', function(){
    //console.log(thisTitle+" "+thisMessage);
    //console.log(theDiv);
    //console.log(event);
    var popup = $("#popup-wrap")
    $(popup).find(".popup-title").text(j.title);
    $(popup).find(".popup-message").text(j.message);
    $("#popup-wrap").fadeIn();
    //});
}
$("#popup-wrap").on("click", function () {
    $(this).fadeOut()
});

var lastAddedPin;
//place marker on map; gets called by click event
function placeMarker(position) {
    if (lastAddedPin != undefined) {
        lastAddedPin.setMap(null);
        lastAddedPin = null;
    }
    var marker = new google.maps.Marker({
        position: position,
        map: map,
        icon: 'images/icon.png'
    });
    lastAddedPin = marker;
    map.panTo(position);
    //google.maps.event.addListenerOnce(map, 'idle', function(){
    console.log('this logs after the panTo finishes.');
    //CALL POPUP FORM HERE
    addPinFormPopUp(position.lat(), position.lng());
    //});


}


//MAP INITIALIZATION
function initialize() {
    var mapProp = {
        center: new google.maps.LatLng(22.286918099999998, 114.1494163),
        zoom: 15,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    google.maps.event.addListener(map, 'click', function (e) {
        placeMarker(e.latLng, map);
    });
    getLocation();


    google.maps.event.addListenerOnce(map, 'idle', function () {
        loadPins();
    });

}
google.maps.event.addDomListener(window, 'load', initialize);


function loadPins() {
    getPins(function (pins) {
        for (var i = 0; i < pins.length; i++) {
            addPinFromJSON(pins[i]);
        }
    })
}
var apiPath = "http://zuyin.tech/api";


function postPin(pin) {
    return new Promise(function (resolve, reject) {
        postRequest(apiPath + "/addPin", pin, function (result) {
            if (result.status == 200) {
                resolve(result.responseText);
            }
            else {
                reject(Error(result.statusText));
            }
        });
    });
}

function getPins(callback) {
    getRequest(apiPath + "/getPins", function (result) {
        if (result.status == 200) {
            callback(JSON.parse(result.responseText));
        }
        else {
            reject(Error(result.statusText));
        }
    });
}

function likePin(pin) {
    return new Promise(function (resolve, reject) {
        postRequest(apiPath + "/likePin", {"pinId": pin._id}, function (result) {
            if (result.status == 200) {
                resolve(result.responseText);
            }
            else {
                reject(Error(result.statusText));
            }
        });
    });
}

function dislikePin(pin) {
    return new Promise(function (resolve, reject) {
        postRequest(apiPath + "/dislikePin", {"pinId": pin._id}, function (result) {
            if (result.status == 200) {
                resolve(result.responseText);
            }
            else {
                reject(Error(result.statusText));
            }
        });
    });
}

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
var formCoord = {"lat": 0, "lon": 0};

function addPinFormPopUp(Lat, Lon) {
    $('#addPinFormWrap').removeClass('hide');
    $('#formBackground').removeClass('hide');

    formCoord.lat = Lat;
    formCoord.lon = Lon;
}

$('#newPinButton').on('click', function (e) {
    var Lat = formCoord.lat;
    var Lon = formCoord.lon;

    var Tags = $('#newPinFormTags').val();
    var tagsArray = Tags.split(',');
    var newPin = {
        "title": $('#newPinFormTitle').val(),
        "message": $('#newPinFormMessage').val(),
        "location": {"lat": Lat, "lon": Lon},
        "tags": tagsArray,
        "userId": $('#newPinFormID').val(),
        "like": 0,
        "dislike": 0
    };
    $('#addPinFormWrap').addClass('hide');
    $('#formBackground').addClass('hide');
    $('#newPinFormTags').val('');
    $('#newPinFormTitle').val('');
    $('#newPinFormMessage').val('')

    postPin(newPin);
    GlobalPinsJSON.push(newPin);
    addPinFromJSON(newPin);
});

///FOR DEV OF PINS
//
$('#betaTestImg').on('click', function () {
    $('#betaTestFieldWrap').toggleClass('visible');
});
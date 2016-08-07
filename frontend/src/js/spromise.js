var apiPath = "http://localhost:8888/api";
//var apiPath = "http://zuyin.tech/api";


function get(url) {
    return new Promise(function (resolve, reject) {
        getRequest(url, function (result) {
            if (req.status == 200) {
                resolve(result.response);
            }
            else {
                reject(Error(result.statusText));
            }
        });
    });
}

function postPin(pin) {
    return new Promise(function (resolve, reject) {
        postRequest(apiPath + "/addPin", pin, function (result) {
            if (result.status == 200) {
                resolve(req.response);
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

function addPinFormPopUp(Lat, Lon) {
    $('#addPinFormWrap').removeClass('hide');
    $('#formBackground').removeClass('hide');
    $('#newPinButton').on('click', function (e) {

        var Tags = $('#newPinFormTags').val();
        var tagsArray = Tags.split(',');
        var newPin = {
            "title": $('#newPinFormTitle').val(),
            "message": $('#newPinFormMessage').val(),
            "location": {"lat": Lat, "lon": Lon},
            "tags": tagsArray,
            "user_id": $('#newPinFormID').val() //MUST BE CHANGED WITH USER ID
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
}

///FOR DEV OF PINS
//
$('#betaTestImg').on('click', function () {
    $('#betaTestFieldWrap').toggleClass('visible');
});
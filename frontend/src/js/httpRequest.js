function getRequest(url, cb) {
    var request = createCORSRequest("GET", url);
    if (request) {
        request.onload = function () {
            cb(request);
        };
        request.send();
    }
}

function postRequest(url, data, cb) {
    var request = createCORSRequest("POST", url);
    if (request) {
        request.onload = function () {
            cb(request);
        };
        request.send(JSON.stringify(data));
    }
}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();

    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    if (xhr) {
        xhr.setRequestHeader("Content-Type", "application/json");
    }

    return xhr;
}
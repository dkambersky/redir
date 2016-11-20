//MANUAL OVERRIDE -- set to 'false' to turn redirecting off
enabled = true;

var url = window.location;

var sites = [
    "reddit",
    "youtube",
    "twitter",
    "twitch",
    "facebook"
];

var allowed = [
    "facebook.com/messages"
];

function match(string) {
    var redir = false;
    var length = sites.length;

    for (i = 0; i < length; i++) {
        if (new RegExp(sites[i]).test(string)) {
            redir = true;
        }
    }

    var length = allowed.length
    for (i = 0; i < length; i++) {
        if (new RegExp(allowed[i]).test(string)) {
            redir = false;
        }
    }
    return redir;
}

if (match(url)&& enabled) {
    chrome.extension.sendRequest({
        redirect: "chrome://newtab"
    }); // send redirect message
}

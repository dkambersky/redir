//TODO settings
//TODO storage
//TODO dynamic permission allocation

var enabled = true;
var redirURL = "https://google.co.uk";

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

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        if (match(details.url)) {
            return {
                redirectUrl: redirURL
            };
        } else return {
            redirectURl: details.url
        };

    }, {
        urls: [
          // This function only gets called on URLs we have permissions for anyway
            "*://*/*"
        ],
        types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "object", "xmlhttprequest", "other"]
    }, ["blocking"]);

alert('running');

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

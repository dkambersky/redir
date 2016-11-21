//TODO settings
//TODO storage
//TODO dynamic permission allocation

var enabled = true;
var inited = false;
var redirURL = "https://google.co.uk";
var shit = 5;
var waiting = 0;


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


// / Config helper functions

// Initial setup
function initSettings() {
    loadSettings(1);

    if (!inited) {
        saveSetting('mainUrl', 'https://dkambersky.io/v2');
      saveSetting('inited', 'true');
        saveSetting('enabled', 'true');
/*        saveSetting('sites', [
            "reddit",
            "youtube",
            "twitter",
            "twitch",
            "facebook"
        ]);

        saveSetting('allowed', [
            "facebook.com/messagesxx"
        ]);
        saveSetting('shit', '10');*/

        console.log('init settings should be done');

        loadSettings(true);
    }
}
//clearSettings();
inited = false;
initSettings();
alert(shit);


// Reload config when stored config changes
chrome.storage.onChanged.addListener(function(changes, area) {
    if (area === "sync") {
        loadSettings();
    }
});

function loadSettings(f) {
    chrome.storage.sync.get('shit', function(items) {
        if (items.inited === 'true' || f) {
          console.log('Loading. Waiting:' + waiting );
            for (key in items) {
                console.log('for: ' + key + '  |  ' + items[key]);
            }

            inited = true;
            redirURL = items.mainUrl;
            enabled = items.enabled;
            sites = items.sites;
            allowed = items.allowed;
            shit = 10;
            console.log(shit + ' should be 10, stored: ' + items.shit + items.mainUrl);

        }
    });
}


function saveSetting(key, value) {
    waiting++;
    console.log('Saving a value: ' + key + '. Waiting, this including: ' + waiting);
    chrome.storage.sync.set({
        key: value
    }, function() {
        console.log('value ' + value + ' set for key ' + key);
        waiting--;
    });
    if (chrome.runtime.lastError != null) {
        alert(chrome.runtime.lastError.message + ': error');
    }
}

function clearSettings() {
  console.log('clearingSettings');
    chrome.storage.sync.clear();
}

chrome.storage.local.get(function(result) {
    console.log(result)
})

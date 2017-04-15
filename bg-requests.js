var inited = false
var waiting = 0
var config

/* This used to check for blocked URLs first - not needed now, as the match()
 *  function will only be called on blocked sites in the first place. */
function match(string) {

    var isAllowed = false

    for (i = 0; i < config.allowed.length; i++) {
        if (new RegExp(config.allowed[i]).test(string)) {
            isAllowed = true
        }
    }

    return !isAllowed;
}

function addSite(url, callback) {
    console.log('Registering permissions for ' + url)

    /* Stop if we have permission already */
    chrome.permissions.contains({
        permissions: [],
        origins: [url]
    }, function(result) {
        if (result) {
            return
        }
    });

    /* Request permission */
    chrome.permissions.request({
        permissions: [],
        origins: [url]
    }, function(granted) {
        if (granted) {
            /* Update records */
            console.log('Permission granted.')
            config.sites.push(url)
            saveSetting('sites', config.sites)

            /* Rebuild our Settings page with the callback provided */
            callback()

        } else {
            console.log('Permission denied.')
        }
    });

}

function removeSite(i, callback) {
    var url = config.sites[i]

    chrome.permissions.remove({
        permissions: [],
        origins: [url]
    }, function(removed) {
        if (removed) {

            /* Update config  */
            config.sites.splice(config.sites.indexOf(url), 1)
            saveSetting('sites', config.sites)
            loadSettings()

            /* Rebuild Settings page */
            callback()
        } else {
            console.log('The permission for ' + url + ' could not be removed.')
        }
    });

}

function updateIcon() {
    /* Update icon */
    if (config.redirEnabled) {
        chrome.browserAction.setIcon({path: 'icons/on.png'})
    } else {
        chrome.browserAction.setIcon({path: 'icons/off.png'})
    }

}


/* Config handling functions */
function initValues() {
    saveSetting('mainUrl', 'chrome://extensions/?options=' + chrome.runtime.id);
    saveSetting('inited', true);
    saveSetting('redirEnabled', true);
    saveSetting('newtabEnabled', true)
    saveSetting('sites', []);
    saveSetting('allowed', ["facebook.com/messages"]);

    console.log('Initial settings stored');
    loadSettings();
}

function loadSettings(callback) {
    chrome.storage.sync.get(function(items) {
        if (items.inited) {
            config = items
        } else {
            initValues()
        }
        if (typeof callback !== 'undefined') {
            callback()
        }

    });
}

function saveSetting(key, value, callback) {
    waiting++;
    var a = {};
    a[key] = value;
    chrome.storage.sync.set(a, function() {
        waiting--;
        /* If provided a callback, execute it */
        loadSettings(callback)

    });
    if (chrome.runtime.lastError != null) {
        alert(chrome.runtime.lastError.message + ': error while saving setting ' + key);
    }

}

function clearSettings() {
    console.log('Clearing settings');
    chrome.storage.sync.clear();
}


/* Register listeners */

/* Reload config when stored config changes */
chrome.storage.onChanged.addListener(function(changes, area) {
    if (area === "sync") {
        loadSettings();
    }
});

/* Toggle redirecting on icon clicked */
chrome.browserAction.onClicked.addListener(function(tab) {
    /* Toggle */
    saveSetting('redirEnabled', !config.redirEnabled, updateIcon)
})

/* Main WebRequest listener */
chrome.webRequest.onBeforeRequest.addListener(function(details) {

    if (!config.redirEnabled) {
        return
    }

    if (match(details.url)) {
        return {redirectUrl: config.mainUrl};
    } else
        return {redirectUrl: details.url};
}, {
    /* This listener only gets called on URLs we have permissions for anyway */
    urls: ["*://*/*"],
    types: ["main_frame"]
}, ["blocking"]);

/* On-load, load settings */
loadSettings(updateIcon)

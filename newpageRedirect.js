document.addEventListener("DOMContentLoaded", function() {
    var bg = chrome.extension.getBackgroundPage();

    // Get the current Tab
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {

        /* Decide where to redirect to */
        var url = bg.config.mainUrl

        if (!bg.config.newtabEnabled) {
            url = "chrome-search://local-ntp/local-ntp.html"
        }

        /* Redirect */
        chrome.tabs.update(tabs[0].id, {
            url: url
        }, function() {});
    });

});

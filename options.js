/* On-load */
var bg = chrome.extension.getBackgroundPage()
buildTable()
loadOptions()
hookOptionsListeners()
refocus()

/* Functions */
function buildTable() {
    var sites = bg.config.sites
    var html = '<table id = "sitesTable" class = "sites"><tbody>';

    for (var i = 0, len = sites.length; i < len; ++i) {
        var site = sites[i]
        var prettyName = site.substring(site.indexOf('://') + 5, site.lastIndexOf('/'))
        html += '<tr><td><button type = "button" id = "siteButton' + i + '">-</button></td> <td>' + prettyName + "</td></tr>";
    }
    html += '<tr><td><button type = "button" id = "addButton">+</button></td> <td> <input type = "text" id = "newSite"> </td></tr>';

    document.getElementById('sitesTable').innerHTML = html
    document.getElementById('addButton').addEventListener('click', function(event) {
        bg.addSite(makeOrigin($("#newSite").val()), rebuild)
    })

    $("#sitesTable").delegate("button", "click", function() {
        if (!(this.id === 'addButton')) {
            bg.removeSite(this.id[this.id.length - 1], rebuild)
        }
    })

    $('#newSite').on('keyup', function(e) {
        if (e.keyCode == 13) {
            bg.addSite(makeOrigin($("#newSite").val()), rebuild)
        }
    });

}

function loadOptions() {
    $('#redirCheck').prop('checked', bg.config.redirEnabled)
    $('#newtabCheck').prop('checked', bg.config.newtabEnabled)
    var defaultStr = 'chrome://extensions/?options=' + chrome.runtime.id
    if (defaultStr !== bg.config.mainUrl) {
        $('#redirUrlBox').val(bg.config.mainUrl)
    }
}

function hookOptionsListeners() {
    $('#urlSubmitButton').click(function() {
        var url = $('#redirUrlBox').val()

        /* Prepend protocol if needed */
        if (!/^https?:\/\//i.test(url)) {
            url = 'http://' + url;
        }

        bg.saveSetting('mainUrl', url, loadOptions)

    })

    $('#redirUrlBox').on('keyup', function(e) {
        if (e.keyCode == 13) {
          var url = $('#redirUrlBox').val()

          /* Prepend protocol if needed */
          if (!/^https?:\/\//i.test(url)) {
              url = 'http://' + url;
          }

          bg.saveSetting('mainUrl', url, loadOptions)

        }
    });

    $('#redirCheck').change(function() {
        bg.saveSetting('redirEnabled', this.checked, loadOptions)
    })
    $('#newtabCheck').change(function() {

        bg.saveSetting('newtabEnabled', this.checked, loadOptions)
    })


}

/* Append stuff to make a properly formatted all-encompassing Origin
 * This expects the 'secondlevel.toplevel' format domain, e.g. 'facebook.com'
 * TODO make this work better with all valid inputs
 */
function makeOrigin(input) {

    if (!/^https?:\/\//i.test(input)) {
        return '*://*.' + input + '/*'
    }

    return input + '/*'
}


function refocus(){
  if($('#redirUrlBox').val() === ''){
    $('#redirUrlBox').focus()
  } else {
    $('#newSite').focus()
  }
}

function rebuild(){
  buildTable()
  refocus()
}

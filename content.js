//MANUAL OVERRIDE -- set to 'false' to turn redirecting off
enabled = false;

var pattern = new RegExp("reddit");
var pattern1 = new RegExp("youtube");
var pattern2 = new RegExp("twitter");
var pattern3 = new RegExp("twitch");
var pattern5 = new RegExp("facebook");
var pattern6 = new RegExp("messages");
var urlA = window.location;

var redir = false;

if (pattern.test(urlA)||pattern1.test(urlA)||pattern2.test(urlA)||pattern3.test(urlA) || pattern5.test(urlA)) // if it matches pattern defined above

{redir = true; }

if (pattern6.test(urlA)){
redir = false ;}





if(redir && enabled){

  chrome.extension.sendRequest({redirect: "chrome://newtab"}); // send message to redirect

}

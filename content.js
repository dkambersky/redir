var pattern=new RegExp("reddit");
var pattern1=new RegExp("youtube");
var pattern2=new RegExp("twitter");
var pattern3=new RegExp("twitch");
var pattern4=new RegExp("extensions");
var pattern5=new RegExp("facebook");
var urlA = window.location; 


if (pattern.test(urlA)||pattern1.test(urlA)||pattern2.test(urlA)||pattern3.test(urlA)||pattern4.test(urlA) || pattern5.test(urlA) ) // if it matches pattern defined above
{
  
  chrome.extension.sendRequest({redirect: "http://127.0.0.1:81/v2"}); // send message to redirect

} 
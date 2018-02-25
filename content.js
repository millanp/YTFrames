// VERSION 1 ------------------------
// var $ = jQuery;

console.log("loaded");

var waitTimes = {
    search: 10000,
    scroll: 7000,
    clickButton: 5000,

}

var SCROLLS = 5;

var urlList = [];

var i = 0;

function searchName () {
    // for (var i = 0; i<5; i++) {
    //     window.scrollTo(0,document.body.scrollHeight);
    // }
    console.log("search");
     var timeoutId = setTimeout(function() {scrollToBottom(true)}, waitTimes.search); 
}

function scrollToBottom (doClick) {
    console.log("scrolling");
    for (var i = 0; i<SCROLLS; i++) {
        window.scrollTo(0,document.body.scrollHeight);
    }
    if (doClick) {
        setTimeout(function() {clickButton()}, waitTimes.scroll);
    } else {
        setTimeout(function() {getList()}, waitTimes.scroll);
    }
}

function clickButton () {
    console.log("clicking");
    $('#smb').click();
    setTimeout(function() {scrollToBottom(false)}, waitTimes.clickButton);
}

function getList() {
    // window.scrollTo(0,document.body.scrollHeight);
    var $images = $('.rg_l');
    var lastImage;
    var lastIndex = -1;
    $images = $('.rg_l');
    $images.each(function(imgindex) {
        if ($(this).attr('href')) {
            urlList.push(getUrl($(this)));
        }
        lastImage = this;
        lastIndex++;
    });
    doDownload(urlList);
}

function getUrl ($a) {
    var splitAfterUrl = $a.attr('href').split('&')[0];
    var encodedUrl = splitAfterUrl.split('imgurl=')[1];
    return decodeURIComponent(encodedUrl);
}
function doDownload(urlList) {
    chrome.runtime.sendMessage({action: "download", urlList: urlList.join('\n')}, function(response) {
        console.log(response);
    });

}
searchName();

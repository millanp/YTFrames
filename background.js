var NAME_LIST = [
	"Leonardo DiCaprio",
	"Matt Damon",
	"Jack Nicholson",
	"Mark Wahlberg",
	"Martin Sheen",
	"Robin Williams",
	"Ben Affleck",
	"Jennifer Aniston",
	"Courteney Cox",
	"Lisa Kudrow",
	"Matt LeBlanc",
	"Matthew Perry",
	"David Schwimmer",
	"Ellen DeGeneres",
	"Ben Stiller",
	"Robert De Niro",
	"Owen Wilson",
]

var currentName = 0;
var listenerAdded = false;

// Supposed to Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(beginOrContinueScraping); 

function beginOrContinueScraping() {
	console.log("begin");
	if (currentName < NAME_LIST.length) {
		chrome.tabs.update(null, {url: imageQueryUrl(NAME_LIST[currentName])}, function(tab) {
			if (!listenerAdded) {
				chrome.tabs.onUpdated.addListener(function(tabId, info) {
					if (info.status == "complete" && tabId == tab.id) {
						console.log("inject");
						chrome.tabs.executeScript(null, {file: "content.js"});		
					}
				});
				listenerAdded = true;
			}
		});
	}
}

function imageQueryUrl(query) {
	return "https://www.google.com/images?q=" + encodeURIComponent(query);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
		if (request.action == "download") {
			var downloadUrl = "data:,";
			downloadUrl += encodeURIComponent(request.urlList);
			chrome.downloads.download({
				url: downloadUrl,
				filename: NAME_LIST[currentName]
			});
			currentName++;
			beginOrContinueScraping();
		}
  }
);
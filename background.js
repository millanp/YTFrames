function hello() {
	chrome.tabs.executeScript(null, {file: "content.js"});
}
// Supposed to Called when the user clicks on the browser action icon.
chrome.browserAction.onClicked.addListener(hello); 

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	var downloadUrl = "data:,";
  	downloadUrl += encodeURIComponent(request.urlList);
  	chrome.downloads.download({
  		url: downloadUrl,
  		filename: request.name
	})
  }
);
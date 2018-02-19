chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  //Gets currently active tab.
  chrome.tabs.query({"active" : true, "lastFocusedWindow" : true}, function(tabs) {
    if(request.direction > 0) index = tabs[0].index - 1;
    if(request.direction < 0) index = tabs[0].index + 1;
    if(request.direction != 0 && index > -1) {
      //Gets the next tab over to be scrolled to.
      chrome.tabs.query({"index" : index, "lastFocusedWindow" : true}, function(tabs) {
        if(tabs[0] != undefined) chrome.tabs.update(tabs[0].id, {"active" : true});
      });
    }
  });
});

//Initialize isKey to false so it doesn't scroll on its own randomly.
chrome.storage.local.set({"isKey" : false});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  //Gets currently active tab.
  chrome.tabs.query({"active" : true, "lastFocusedWindow" : true}, function(tabs) {
    //If we scroll down, get index of tab to the left. Else, get tab index to the right.
    if(request.direction > 0) index = tabs[0].index - 1;
    if(request.direction < 0) index = tabs[0].index + 1;

    //Make sure we didn't try to scroll past the 0th tab.
    if(request.direction != 0 && index > -1) {
      //Gets the next tab over to be scrolled to.
      chrome.tabs.query({"index" : index, "lastFocusedWindow" : true}, function(tabs) {
        //Checks to make sure we didn't scroll past the nth tab.
        if(tabs[0] != undefined) chrome.tabs.update(tabs[0].id, {"active" : true});
      });
    }
  });
});

//We receive the command to exit from tab scrolling mode.
chrome.commands.onCommand.addListener(function(command) {
  chrome.storage.local.set({"isKey" : false});
});

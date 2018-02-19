//If the shift and alt keys are down, set isKey to true, entering tab scrolling mode.
window.addEventListener("keydown", function(key) {
  if(key.shiftKey && key.altKey) {
    chrome.storage.local.set({"isKey" : true});
  }
});

//On scroll, get the value of isKey, check if there is wheel movement, and isKey is true.
window.addEventListener("wheel", function(event) {
  chrome.storage.local.get("isKey",function(value) {
    isKey = value.isKey;
    if(event.deltaY != null && isKey) {
      //If true, pass message to background JS file, giving it the direction of the mouse scroll.
      chrome.runtime.sendMessage({"direction" : event.deltaY});
    }
  });
});

var isKey;

//If the shift key is down, set isKey to true.
window.addEventListener("keydown", function(key) {
  chrome.storage.local.set({"isKey" : key.shiftKey});
});

//If a key is released, set isKey to false.
window.addEventListener("keyup", function(key) {
  chrome.storage.local.set({"isKey" : false});
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

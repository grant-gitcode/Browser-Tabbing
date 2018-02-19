var isKey;

window.addEventListener("keydown", function(key) {
  chrome.storage.local.set({"isKey" : key.shiftKey});
});

window.addEventListener("keyup", function(key) {
  chrome.storage.local.set({"isKey" : false});
});

window.addEventListener("wheel", function(event) {
  chrome.storage.local.get("isKey",function(value) {
    isKey = value.isKey;
    if(event.deltaY != null && isKey) {
      chrome.runtime.sendMessage({"direction" : event.deltaY});
    }
  });
});

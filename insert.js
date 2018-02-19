window.onload = addScrollListener();

var isKey = false;
var isScroll = false;

function addScrollListener() {

  window.addEventListener("keydown", function(key) {
    isKey = key.shiftKey;
  });

  window.addEventListener("keyup", function(key) {
    isKey = false;
  });

  document.body.addEventListener("wheel", function(event) {
    if(event.deltaY != null && isKey) {
      chrome.runtime.sendMessage({"direction" : event.deltaY});
    }

  });

}

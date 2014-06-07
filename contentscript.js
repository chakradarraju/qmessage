window.onerror = function(e) {
  console.log(e);
}

function attachEventHandler() {
  document.querySelector("div[class='inline_editor_form'] div[interactive=true]").onkeypress = eventHandler;
}

function eventHandler(e) {
  if (e.ctrlKey == false && e.charCode == 13) {
    document.querySelector("a[class='submit_button']").click();
    e.preventDefault();
    attachEventHandler();
  }
};

attachEventHandler();

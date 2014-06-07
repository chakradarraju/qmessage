window.onerror = function(e) {
  console.log(e);
}

var selector = {
  editor: "div[class='inline_editor_form'] div[interactive=true]",
  submit: "a[class='submit_button']",
  messages: "div[class='inbox_message_text']"
};

function attachEventHandler() {
  document.querySelector(selector.editor).onkeypress = eventHandler;
}

function eventHandler(e) {
  if (e.ctrlKey == false && e.charCode == 13) {
    document.querySelector(selector.submit).click();
    e.preventDefault();
    attachEventHandler();
    setTimeout(replaceAllEmoticonsInPage, 1000);
  }
};

function replaceAllEmoticonsInPage() {
  var messages = document.querySelectorAll(selector.messages);
  for (var i = 0; i < messages.length; i++) {
    replaceEmoticonsInMessage(messages[i]);
  }
}

function replaceEmoticonsInMessage(message) {
  var newContent, newContentLength;
  for (var i = 0; i < message.childNodes.length; i++) if (message.childNodes[i].nodeType == 3) {
    newContent = replaceEmoticonsInText(message.childNodes[i]);
    newContentLength = newContent.length;
    for (var j = 0; j < newContentLength; j++) {
      message.insertBefore(newContent[0], message.childNodes[i++]);
    }
    message.removeChild(message.childNodes[i--]);
  }
}

var smileys = {
  happy: /:\)/g,
  sad: /:\(/g,
  laugh: /:D/g,
  nimpressed: /:\//g,
  dcare: /:\|/g,
  irritate: /:p/g,
  wink: /;\)/g,
  koku: /:P/g,
  cry: /:'\(/g
}

function replaceEmoticonsInText(text) {
  var newContent = text.data;
  for (name in smileys) {
    newContent = newContent.replace(smileys[name], "<div class='smiley smiley-"+name+"'></div>");
  }
  return createNodes(newContent);
}

function createNodes(content) {
  var node = document.createElement("div");
  node.innerHTML = content;
  return node.childNodes;
}

attachEventHandler();
replaceAllEmoticonsInPage();

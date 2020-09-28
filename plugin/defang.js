function detectPatterns(bodyText){
  var detects = []
  var patterns = { // TODO these could be refined
    ip: /(\d{1,3}\.){3}\d{1,3}/ig,
    handler: /[^\s<>]+:\/\//ig,
    domain: /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/ig
  }
  for (var p in patterns){
    var detect = bodyText.match(patterns[p])
    for (var d in detect){
      detects.push({pattern: p, match: detect[d]})
    }
  }
  return detects
}

function sanitizeMessage(message){
  var matches = detectPatterns(message)
  if (matches.length > 0){ 
    for (var m in matches){
      console.log(matches[m])
    }
    // TODO replace matches
    // replaceMatches(matches, text)
  }
  return matches
}

function defang(event) {
  // get current message
  Office.context.mailbox.item.body.getAsync("html", {asyncContext: "msgBody"},
    function(messageBody){
      // sanitize
      var matches = sanitizeMessage(messageBody['value'])

      // notify
      var msgText = matches.length + ' items defanged.'
      const message = {
        type: Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,
        message: msgText,
        icon: "Icon.80x80",
        persistent: true
      };
      Office.context.mailbox.item.notificationMessages.replaceAsync("defang", message);
    }
  );
  try {event.completed()} catch(e) {if (e instanceof TypeError){}}
}
  
function getGlobal() {
  return typeof self !== "undefined"
    ? self
    : typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
    ? global
    : undefined;
}

// register funcs for add-in
const g = getGlobal();
g.defang = defang;

Office.onReady(info => {
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("detect").onclick = function(){
      Office.context.mailbox.item.body.getAsync("html", {asyncContext: "msgBody"},
      function(message){
        var detects = detectPatterns(message['value'])
        for (var d in detects){

          var value = detects[d]['pattern'] + ': ' + detects[d]['match']
          var textnode = document.createTextNode(value);
          var node = document.createElement("li")
          node.appendChild(textnode)
          document.getElementById("results").appendChild(node)
        }
        document.getElementById("results").style.display = 'block'
      }
    );
    };
  }
});
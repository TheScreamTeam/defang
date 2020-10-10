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
  var sanitizedBody = message
  var matches = detectPatterns(message)
  console.log('var matches')
  console.log(matches)
  if (matches.length > 0){ 
    for (var m in matches){
      var sanitized = ''
      if (matches[m]['pattern'] == 'ip' || matches[m]['pattern'] == 'domain'){
        console.log('sanitized var')
        sanitized = matches[m]['match'].replaceAll('.', '[.]')
        console.log(sanitized)
      }
      console.log('var message')
      console.log(message)

      sanitizedBody = sanitizedBody.replaceAll(matches[m]['match'], sanitized)
      console.log('sanitizedBody var')
      console.log(sanitizedBody)
    }
  }
  Office.context.mailbox.item.body.setAsync('', {asyncContext: "msgBody"},
    function(message){
      Office.context.mailbox.item.body.setSelectedDataAsync(
        sanitizedBody,
        { coercionType: Office.CoercionType.Html, 
        asyncContext: { var3: 1, var4: 2 } },
        function (asyncResult) {
          console.log('update body')
        }
        )
    }
  );

}

function sanitize(event) {
  Office.context.mailbox.item.body.getAsync("html", {asyncContext: "msgBody"},
  function(message){
    sanitizeMessage(message['value'])
  })

  Office.context.mailbox.item.body.getAsync("html", {asyncContext: "msgBody"},
  function(message){
    sanitizeMessage(message['value'])
    console.log('es')
    /*
    var msgText = 'Message sanitized.'
    const notify = {
      type: Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,
      message: msgText,
      icon: "Icon.80x80",
      persistent: true
    };
    Office.context.mailbox.item.notificationMessages.replaceAsync("sanitize", notify);
    */
  })
  event.completed()
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

Office.onReady(info => {
  if (info.host === Office.HostType.Outlook) {
    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
    document.getElementById("detect").onclick = function(){
      Office.context.mailbox.item.body.getAsync("html", {asyncContext: "msgBody"},
      function(message){
        document.getElementById("results").innerHTML = "";
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
    document.getElementById("sanitize").onclick = function(){
      Office.context.mailbox.item.body.getAsync("html", {asyncContext: "msgBody"},
      function(message){
        sanitizeMessage(message['value'])
      })
    }
  }
});


// register funcs for add-in
const g = getGlobal();
g.sanitize = sanitize;
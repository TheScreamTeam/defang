Office.onReady(() => {});

function detectPatterns(bodyText){
  matches = []
  patterns = { // TODO these could be refined
    ip: /(\d{1,3}\.){3}\d{1,3}/ig,
    handler: /[^\s<>]+:\/\//ig,
    domain: /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/ig
  }
  for (p in patterns){
    match = bodyText.match(patterns[p])
    for (m in match){
      matches.push({pattern: p, match: match[m]})
    }
  }
  //uniqueMatches = new [...Set(matches)];
  return matches
}

function sanitizeMessage(messageBody){
  bodyText = messageBody['value']
  matches = detectPatterns(bodyText)
  if (matches.length > 0){ 
    for (m in matches){
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
      matches = sanitizeMessage(messageBody)

      // notify
      msgText = matches.length + ' items defanged.'
      const message = {
        type: Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,
        message: msgText,
        icon: "Icon.80x80",
        persistent: true
      };
      Office.context.mailbox.item.notificationMessages.replaceAsync("defang", message);
    }
  );
  event.completed();
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
  
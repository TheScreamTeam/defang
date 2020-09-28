Office.onReady(() => {});

function detectPatterns(text){
  matches = []
  // TODO define patterns
  patterns = [
    /8\.8\.8\.8/igm,
    /\.com/igm,
    /[^\s\\]+:\/\//igm // TODO discard matches over 2,083 chars
  ]
  for (p in patterns){
    match = text.match(patterns[p])
    if (match){
      matches = matches.concat(match)
    }
  }
  return matches
}

function sanitizeMessage(messageBody){
  bodyText = messageBody['value']
  matches = detectPatterns(bodyText)
  if (matches.length > 0){ 
    console.log('matches')
    console.log(matches)
    // TODO replace matches
    // replaceMatches(matches, text)
  }
  return matches
}

function defang(event) {
  // get current message
  Office.context.mailbox.item.body.getAsync("text", {asyncContext: "msgBody"},
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
  
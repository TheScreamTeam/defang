# defang
outlook plugin for defanging emails

defanging is the process of sanitizing ips, domains, and urls for safe handling. 

defanging is typically used when communicating indicators of compromise (IOCs), in order to not trigger security signatures.

```
5.22.9.12         >>>  5[.]22[.]9[.]12
evil.com          >>>  evil[.]com
https://evil.com  >>>  hXXps://evil[.]com
```

## todo
- define defang regex
  - ip, domain, url
- auto-detect defang possibilities
- preview of defang content
- ability to refang
- auto-defang toggle switch
  - defang on email send
- ability to add custom regex detection
- find a free fang icon lol

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
  - defang on email send - [limitation](https://docs.microsoft.com/en-us/office/dev/add-ins/outlook/outlook-on-send-addins?tabs=windows#limitations)
  - defang on specific recipient address/domain
- ability to add custom regex detection
- find a free fang icon lol


## dev

1. serve plugin content:
    - generate cert:  
    `openssl req -new -x509 -keyout server.pem -out localhost.pem -days 365 -nodes`
    - start server:  
    `python3 server.py plugin/ localhost.pem`

2. [upload dev-manifest.xml](https://code.visualstudio.com/docs/other/office#_install-the-addin) to outlook
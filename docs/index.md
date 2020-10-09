## Sanitizes Indicators of Compromise

Defang is an outlook plugin that allows you to quickly sanitize IPs, domains, and [protocol handlers](https://en.wikipedia.org/wiki/List_of_URI_schemes) while composing or receiving emails.

```
5.22.9.12  >>>  5[.]22[.]9[.]12
evil.com   >>>  evil[.]com
https://   >>>  https[:]//
```

This promotes the sharing of IOCs in a safe format that is consistently undetectable by email protections and other threat filters.

## Install / Test

- <a href="#" onclick="downloadManifest();">test</a>
- Download [manifest.xml](https://raw.githubusercontent.com/TheScreamTeam/defang/master/manifest.xml)
- [Side-load](https://docs.microsoft.com/en-us/office/dev/add-ins/outlook/sideload-outlook-add-ins-for-testing) into Outlook

## Distribute

- Download [manifest.xml](https://raw.githubusercontent.com/TheScreamTeam/defang/master/manifest.xml)
- [Deploy to Outlook users](https://docs.microsoft.com/en-us/office/dev/add-ins/publish/publish) via Microsoft 365 admin center, SharePoint catalog, or Exchange server.

### Marketplace Sponsor

I would love to freely distribute this plugin via [Microsoft AppSource](https://appsource.microsoft.com/), but require business credentials. If you are interested in publishing this plugin, please contact michael[at]wtfender.com.
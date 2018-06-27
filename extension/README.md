A fork from the original [hover-inspect](https://github.com/ilyashubin/hover-inspect).

Additions:
* original *click* event sends a message to background page to allow copy of selected element xpath
```javascript
       
    document.addEventListener('click', function () {
        ...
        chrome.runtime.sendMessage(XPathUtils.createXPathFromElement(this.$selection));
    }.bind(this));
```
* added *background.html* for support of copying to clipboard
```javascript

chrome.runtime.onMessage.addListener(function (value) {
    var clipboard = document.getElementById('clipboard');
    clipboard.value = value;
    clipboard.focus();
    clipboard.select();
    return document.execCommand('copy');
});
```

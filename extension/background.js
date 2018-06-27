chrome.runtime.onMessage.addListener(function (value) {
    var clipboard = document.getElementById('clipboard');
    clipboard.value = value;
    clipboard.focus();
    clipboard.select();
    return document.execCommand('copy');
});

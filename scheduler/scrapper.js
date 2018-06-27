var request = require('request');
var xpath = require('xpath');
var DOMParser = require('xmldom').DOMParser;
// var JSDOM = require('jsdom').JSDOM;

function extract(body, xpath) {
    // var document = new JSDOM(body).window.document;
    var document = new DOMParser().parseFromString(body, 'text/xml');
    return lookupElementByXPath(xpath, document)
}

function lookupElementByXPath(path, document) {
    // var result = xpath.evaluate(path, document, null, xpath.XPathResult.STRING_TYPE, null);
    var result = xpath.select(path, document);
    return result.length ? result[0].firstChild.data : null
}

module.exports = {
    lookup: function (url, xpath, callback) {
        request(url, function (error, response, body) {
            if (error) callback(error);
            else callback(null, extract(body, xpath))
        })
    }
};

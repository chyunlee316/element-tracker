var admin = require("firebase-admin");
var _ = require('underscore');
var scrapper = require("./scrapper");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://element-tracker-168bd.firebaseio.com"
});

var users = {};

admin.database()
    .ref("users").on("value", function(snapshot) {
        users = snapshot.val()
    }, function (err) {
        console.log("Could not read from users: " + err.code);
    });

setInterval(function () {
    console.log("Running scheduler: " + new Date());
    _.forEach(users, function (user, uid) {
        var elements = user.elements;

        _.forEach(elements, function (element, key) {
            scrapper.lookup(element.url, element.xpath, function (error, result) {
                if (error) console.error(error);
                else if (result) {
                    admin.database()
                        .ref("users/" + uid + "/elements/" + key + "/timeseries")
                        .push({
                            timestamp: new Date().getTime(),
                            value: result
                        })
                } else console.warn("Could not find any data for: " + JSON.stringify(element));
            })
        })
    })
}, 15 * 1000);

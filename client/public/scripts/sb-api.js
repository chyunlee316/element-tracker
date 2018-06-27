var ElementTrackerAPI = {};

/**
 * Adds element item to database for batch processing
 *
 * @param element valid question object
 * @param callback Node-style callback(err, data)
 */
ElementTrackerAPI.enqueue = function (element, callback) {
    firebase.database()
        .ref('users/' + window.stackBusterUser.uid + '/elements')
        .push(element)
        .then(function () {
            callback(null, {
                name: 'Info',
                message: 'Element ' + JSON.stringify(element) + ' has been added for processing.'
            })
        })
        .catch(function (error) {
            callback(error)
        })
    ;
};

/**
 * Removes element item from database
 *
 * @param element element
 */
ElementTrackerAPI.remove = function (element) {
    firebase.database()
        .ref('users/' + window.stackBusterUser.uid + '/elements/' + element.key)
        .remove()
        .then(function () {
            callback(null, {
                name: 'Info',
                message: 'Element ' + JSON.stringify(element) + ' has been removed from processing.'
            })
        })
        .catch(function (error) {
            callback(error)
        })
    ;
};

/**
 * Loads queued elements for current user
 *
 * @param callback with elements object
 */
ElementTrackerAPI.loadElements = function (callback) {
    firebase.database()
        .ref('users/' + window.stackBusterUser.uid + '/elements')
        .on('value', function (snapshot) {
            callback(snapshot.val())
        })
};

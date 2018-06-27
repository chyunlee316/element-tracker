var ElementTrackerUI = (new function () {
    this.show = function (id) {
        document.getElementById(id).style.display = 'block';
    };

    this.hide = function (id) {
        document.getElementById(id).style.display = 'none';
    };

    /**
     * Display welcome logo
     *
     * @param id container id
     * @param user logged in user
     */
    this.buildLogo = function (id, user) {
        var header = document.getElementById(id),
            avatar = document.createElement('img'),
            welcome = document.createElement('H3'),
            welcomeText = document.createTextNode('Welcome, ' + user.displayName + '!');

        avatar.src = user.photoURL;
        avatar.classList.add('sb-avatar');
        header.appendChild(avatar);
        welcome.appendChild(welcomeText);
        header.appendChild(welcome);
    };

    /**
     * Display messages
     *
     * @param message info or error message
     */
    this.buildMessage = function (message) {
        var container = document.getElementById('sb-message-container'),
            close = document.createElement('span'),
            title = document.createElement('strong'),
            self = this;

        // initialize stuff if necessary
        message = message || {};
        message.name = message.name || 'Error';
        message.message = message.message || 'Something went wrong.';

        container.className = 'alert alert-' + message.name;
        container.innerHTML = null;
        close.addEventListener('click', function () {
            self.hide('sb-message-container')
        });
        close.className = 'close-btn';
        close.appendChild(document.createTextNode('\u02DF'));
        container.appendChild(close);
        title.appendChild(document.createTextNode(message.name));
        container.appendChild(title);
        container.appendChild(document.createTextNode(message.message));
        this.show('sb-message-container')
    };

    /**
     * Displays elements
     *
     * @param id container id
     * @param elementsObject elements object
     */
    this.build = function (id, elementsObject) {
        var container = document.getElementById(id);
        // always clear out table
        container.innerHTML = null;

        for (var key in elementsObject) {
            if (elementsObject.hasOwnProperty(key)) {
                var element = Object.assign({}, elementsObject[key], {id: key});
                var chart = document.createElement('div');
                chart.id = key;
                chart.className = "et-chart-container";
                container.appendChild(chart);

                new Morris.Line({
                    element: key,
                    data: $.map(element.timeseries, function (value) {
                        return value
                    }),
                    xkey: 'timestamp',
                    ykeys: [ 'value' ],
                    labels: [ 'Value' ]
                });

                var title = document.createElement('span');
                title.className = "et-chart-title";
                title.innerHTML = title.title = JSON.stringify({ url: element.url, xpath: element.xpath });
                $(chart).prepend($(title));
            }
        }
    };
}());

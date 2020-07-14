
Package.describe({
    summary: "lightweight jQuery plugin that makes scrollbars look like in OSX Lion for Meteor."
});

Package.on_use(function (api, where) {

    // USE 
    api.use(["jquery"]);   

    // CSS
    api.add_files('lib/css/lionbars.css', 'client');

    // JS
    api.add_files('lib/js/lionbars.js', 'client');
});


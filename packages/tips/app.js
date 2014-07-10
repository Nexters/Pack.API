'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Tips = new Module('tips');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Tips.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Tips.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Tips.menus.add({
        title: 'tips example page',
        link: 'tips example page',
        roles: ['authenticated'],
        menu: 'main'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Tips.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Tips.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Tips.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Tips;
});

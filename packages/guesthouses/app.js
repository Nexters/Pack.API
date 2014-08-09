'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Guesthouses = new Module('guesthouses');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Guesthouses.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Guesthouses.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Guesthouses.menus.add({
        title: '게스트하우스 리스트',
        link: 'all guesthouses',
        roles: ['admin'],
        menu: 'guesthouses'
    });

    Guesthouses.menus.add({
        title: '새로운 게스트하우스 입력',
        link: 'new guesthouse',
        roles: ['admin'],
        menu: 'guesthouses'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Guesthouses.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Guesthouses.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Guesthouses.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Guesthouses;
});

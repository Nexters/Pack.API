'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Stamps = new Module('stamps');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Stamps.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Stamps.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Stamps.menus.add({
        title: '이벤트 리스트 보기.',
        link: 'all stamps',
        roles: ['admin'],
        menu: 'stamps'
    });

    Stamps.menus.add({
        title: '새로운 이벤트 생성하기.',
        link: 'new stamp',
        roles: ['admin'],
        menu: 'stamps'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Stamps.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Stamps.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Stamps.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Stamps;
});

'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Stations = new Module('stations');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Stations.register(function(app, auth, database) {

    //We enable routing. By default the Package Object is passed to the routes
    Stations.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Stations.menus.add({
         title: '역 정보 리스트.',
         link: 'all stations',
         roles: ['admin'],
         menu: 'stations'
    });
    Stations.menus.add({
         title: '새로운 역 입력하기.',
         link: 'new station',
         roles: ['admin'],
         menu: 'stations'
    });
    
    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Stations.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Stations.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Stations.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Stations;
});

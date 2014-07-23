'use strict';
var stations = require('../controllers/stations');

// The Package is past automatically as first parameter
module.exports = function(Stations, app, auth, database) {
    //CRUD
    app.route('/stations')
        .get(stations.all)
        .post(stations.create);
    app.route('/stations/:stationId')
        .get(stations.show)
        .put(stations.update);
    app.param('userId', stations.station);

    //Custom route
    app.route('/stations/near')
        .get(stations.near);
        
    /*
    app.get('/stations/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/stations/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/stations/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/stations/example/render', function(req, res, next) {
        Stations.render('index', {
            package: 'stations'
        }, function(err, html) {
            res.send(html);
        });
    });
    */
};

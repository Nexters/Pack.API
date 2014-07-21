'use strict';
var stations = require('../controllers/stations');

// The Package is past automatically as first parameter
module.exports = function(Stations, app, auth, database) {
    app.route('/stations/near')
        .get(stations.near);
    app.route('/stations/:stationId/create')
        .post(stations.comment_create);
    app.route('/stations/:stationId/comments')
        .get(stations.comments);
    app.route('/stations/:stationId')
        .get(stations.show);
    app.route('/stations/create')
        .post(stations.create);
    app.param('stationId', stations.station);
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

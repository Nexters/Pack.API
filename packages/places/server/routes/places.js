'use strict';
var places = require('../controllers/places');

// The Package is past automatically as first parameter
module.exports = function(Places, app, auth, database) {

    app.route('/places')
        .get(places.all)
        .post(places.create);

    app.route('/places/:placeId')
        .put(places.update)
        .get(places.show);

    // Finish with setting up the placeId param
    app.param('placeId', places.place);

    /*app.get('/places/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/places/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/places/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/places/example/render', function(req, res, next) {
        Places.render('index', {
            package: 'places'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });*/
};

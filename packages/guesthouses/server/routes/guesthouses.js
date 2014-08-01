'use strict';

// The Package is past automatically as first parameter
module.exports = function(Guesthouses, app, auth, database) {

    app.get('/guesthouses/example/anyone', function(req, res, next) {
        res.send('Anyone can access this');
    });

    app.get('/guesthouses/example/auth', auth.requiresLogin, function(req, res, next) {
        res.send('Only authenticated users can access this');
    });

    app.get('/guesthouses/example/admin', auth.requiresAdmin, function(req, res, next) {
        res.send('Only users with Admin role can access this');
    });

    app.get('/guesthouses/example/render', function(req, res, next) {
        Guesthouses.render('index', {
            package: 'guesthouses'
        }, function(err, html) {
            //Rendering a view from the Package server/views
            res.send(html);
        });
    });
};

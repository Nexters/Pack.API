'use strict';

var stamps = require('../controllers/stamps');

// The Package is past automatically as first parameter
module.exports = function(Stamps, app, auth, database) {

    //CRUD
    app.route('/stamps')
        .get(stamps.all)
        .post(stamps.create);

    app.route('/stamps/:stampId')
        .put(stamps.update)
        .get(stamps.show);

    app.param('stampId', stamps.stamp);
    // app.get('/stamps/example/anyone', function(req, res, next) {
    //     res.send('Anyone can access this');
    // });
    //
    // app.get('/stamps/example/auth', auth.requiresLogin, function(req, res, next) {
    //     res.send('Only authenticated users can access this');
    // });
    //
    // app.get('/stamps/example/admin', auth.requiresAdmin, function(req, res, next) {
    //     res.send('Only users with Admin role can access this');
    // });
    //
    // app.get('/stamps/example/render', function(req, res, next) {
    //     Stamps.render('index', {
    //         package: 'stamps'
    //     }, function(err, html) {
    //         //Rendering a view from the Package server/views
    //         res.send(html);
    //     });
    // });
};

'use strict';
var guesthouses = require('../controllers/guesthouses');

// The Package is past automatically as first parameter
module.exports = function(Guesthouses, app, auth, database) {

    app.route('/guesthouses')
        .get(guesthouses.all)
        .post(guesthouses.create);

    app.route('/guesthouses/near')
        .post(guesthouses.near);

    app.route('/guesthouses/:gusethouseId')
        .put(guesthouses.update)
        .get(guesthouses.show);

    //app.param('gusethouseId', guesthouses.guesthouse);
};

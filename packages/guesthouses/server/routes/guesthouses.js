'use strict';

// The Package is past automatically as first parameter
module.exports = function(Guesthouses, app, auth, database) {

    app.route('/guesthouses')
        .get(stations.all)
        .post(stations.create);
  
    app.route('/guesthouses/:stationId')
        .put(stations.update)
        .get(stations.show);

    app.param('stationId', stations.station);

};

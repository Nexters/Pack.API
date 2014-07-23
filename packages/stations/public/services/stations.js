'use strict';

angular.module('mean.stations').factory('Stations', ['$resource',
    function($resource) {
        return $resource('stations/:stationId', {
          stationId: '@_id'
        }, {
          update: {
            method: 'PUT'
          }
        });
    }
]);

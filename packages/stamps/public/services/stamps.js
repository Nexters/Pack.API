'use strict';

angular.module('mean.stamps').factory('Stamps', [ '$resource',
    function($resource) {
        return $resource('stamps/:stampId', {
          stampId: '@_id'
        }, {
          update: {
            method: 'PUT'
          }
        });
    }
]);

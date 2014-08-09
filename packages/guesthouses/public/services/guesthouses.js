'use strict';

angular.module('mean.guesthouses').factory('Guesthouses', [ '$resource',
    function($resource) {
        return $resource('guesthouses/:guesthouseId', {
          guesthouseId: '@_id'
        }, {
          update: {
            method: 'PUT'
          }
        });
    }
]);

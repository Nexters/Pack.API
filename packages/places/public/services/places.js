'use strict';

angular.module('mean.places').factory('Places', [ '$resource',
    function($resource) {
        return $resource('places/:placeId', {
           placeId: '@_id'
        }, {
          update: {
            method: 'PUT'
          }
        }); 
    }
]);

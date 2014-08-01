'use strict';

angular.module('mean.guesthouses').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('guesthouses example page', {
            url: '/guesthouses/example',
            templateUrl: 'guesthouses/views/index.html'
        });
    }
]);

'use strict';

angular.module('mean.stations').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('stations example page', {
            url: '/stations/example',
            templateUrl: 'stations/views/index.html'
        });
    }
]);

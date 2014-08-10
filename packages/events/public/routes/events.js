'use strict';

angular.module('mean.events').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('events example page', {
            url: '/events/example',
            templateUrl: 'events/views/index.html'
        });
    }
]);

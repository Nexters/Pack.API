'use strict';

angular.module('mean.tips').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider.state('tips example page', {
            url: '/tips/example',
            templateUrl: 'tips/views/index.html'
        });
    }
]);

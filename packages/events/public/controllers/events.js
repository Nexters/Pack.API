'use strict';

angular.module('mean.events').controller('EventsController', ['$scope', 'Global', 'Events',
    function($scope, Global, Events) {
        $scope.global = Global;
        $scope.package = {
            name: 'events'
        };
    }
]);

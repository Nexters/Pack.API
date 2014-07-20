'use strict';

angular.module('mean.stations').controller('StationsController', ['$scope', 'Global', 'Stations',
    function($scope, Global, Stations) {
        $scope.global = Global;
        $scope.package = {
            name: 'stations'
        };
    }
]);

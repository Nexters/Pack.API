'use strict';

angular.module('mean.tips').controller('TipsController', ['$scope', 'Global', 'Tips',
    function($scope, Global, Tips) {
        $scope.global = Global;
        $scope.package = {
            name: 'tips'
        };
    }
]);

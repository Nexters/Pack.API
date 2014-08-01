'use strict';

angular.module('mean.guesthouses').controller('GuesthousesController', ['$scope', 'Global', 'Guesthouses',
    function($scope, Global, Guesthouses) {
        $scope.global = Global;
        $scope.package = {
            name: 'guesthouses'
        };
    }
]);

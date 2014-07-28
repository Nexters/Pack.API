'use strict';

angular.module('mean.places').controller('PlacesController', ['$scope', 'Global', 'Places',
    function($scope, Global, Places) {
        $scope.global = Global;
        $scope.package = {
            name: 'places'
        };

        
    }
]);

'use strict';

angular.module('mean.guesthouses').controller('GuesthousesController', ['$scope', '$stateParams', 'Global', '$location', 'Guesthouses',
    function($scope, $stateParams, $location, Global, Guesthouses) {
        $scope.global = Global;
        $scope.package = {
            name: 'guesthouses'
        };

        $scope.hasAuthorization = function(guesthouse) {
            if (!guesthouse) return false;
            return $scope.global.isAdmin;
        };

        $scope.create = function(isValid) {
            if (isValid) {
                var guesthouse = new Guesthouses({
                    name: this.name,
                    city: this.city,
                    loc: this.loc,
                    address: this.address,
                    info: this.info,
                    near_stations: this.near_stations,
                    price: this.price
                });
                guesthouse.$save(function(response) {
                    $location.path('guesthouses/' + response._id);
                });

                this.name = '';
                this.city = '';
                this.loc = [];
                this.address = '';
                this.info = '';
                this.near_stations = [];
                this.price = 0;
            } else {
                $scope.submitted = true;
            }
        };

        $scope.remove = function(guesthouse) {
            if (guesthouse) {
                guesthouse.$remove();

                for (var i in $scope.guesthouses) {
                    if ($scope.guesthouses[i] === guesthouse) {
                        $scope.guesthouses.splice(i, 1);
                    }
                }
            } else {
                $scope.guesthouses.$remove(function(response) {
                    $location.path('guesthouses');
                });
            }
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var guesthouse = $scope.guesthouse;
                if (!guesthouse.updated) {
                    guesthouse.updated = [];
                }
                guesthouse.updated.push(new Date().getTime());

                guesthouse.$update(function() {
                    $location.path('guesthouses/' + guesthouse._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Guesthouses.query(function(guesthouses) {
                $scope.guesthouses = guesthouses;
            });
        };

        $scope.findOne = function() {
            Guesthouses.get({
                guesthouseId: $stateParams.guesthouseId
            }, function(guesthouse) {
                $scope.guesthouse = guesthouse;
            });
        };

        $scope.date = function(guesthouse) {
            var date = guesthouse.created;
            if(guesthouse.updated) {
                date = guesthouse.updated;
            }

            return date;
        };
    }
]);

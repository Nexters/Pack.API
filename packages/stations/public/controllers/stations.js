'use strict';

angular.module('mean.stations').controller('StationsController', ['$scope', '$stateParams',  '$location', 'Global', 'Stations',
    function($scope, $stateParams, $location, Global, Stations) {
        $scope.global = Global;
        $scope.package = {
            name: 'stations'
        };

        $scope.hasAuthorization = function(station) {
            if (!station) return false;
            return $scope.global.isAdmin;
        };

        $scope.create = function(isValid) {
            if (isValid) {
                var station = new Stations({
                    name: this.name,
                    type: this.type,
                    lat: this.lat,
                    lng: this.lng,
                    address: this.address
                });
                station.$save(function(response) {
                    $location.path('stations/' + response._id);
                });

                this.name = '';
                this.type = '';
                this.lat = '';
                this.lng = '';
                this.address = '';
            } else {
                $scope.submitted = true;
            }
        };

        $scope.remove = function(station) {
            if (station) {
                station.$remove();

                for (var i in $scope.stations) {
                    if ($scope.stations[i] === station) {
                        $scope.stations.splice(i, 1);
                    }
                }
            } else {
                $scope.stations.$remove(function(response) {
                    $location.path('stations');
                });
            }
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var station = $scope.station;
                if (!station.updated) {
                    station.updated = [];
                }
                station.updated.push(new Date().getTime());

                station.$update(function() {
                    $location.path('stations/' + station._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Stations.query(function(stations) {
                $scope.stations = stations;
            });
        };

        $scope.findOne = function() {
            Stations.get({
                stationId: $stateParams.stationId
            }, function(station) {
                $scope.station = station;
            });
        };

        $scope.date = function(station) {
            var date = station.created;
            if(station.updated) {
                date = station.updated;
            }

            return date;
        };
    }
]);

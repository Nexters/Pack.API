'use strict';

angular.module('mean.stamps').controller('StampsController', ['$scope', '$stateParams', 'Global', '$location', 'Stamps',
    function($scope, $stateParams, $location, Global, Stamps) {
        $scope.global = Global;
        $scope.package = {
            name: 'stamps'
        };

        $scope.hasAuthorization = function(stamp) {
            //if (!stamp) return false;
            return $scope.global.isAdmin;
        };

        $scope.create = function(isValid) {
            if (isValid) {
                var stamp = new Stamps({
                    name: this.name,
                    type: this.type,
                    loc: this.loc
                });
                stamp.$save(function(response) {
                    $location.path('stamps/' + response._id);
                });

                this.name = '';
                this.type = '';
                this.loc = [];
            } else {
                $scope.submitted = true;
            }
        };

        // $scope.remove = function(stamp) {
        //     if (stamp) {
        //         stamp.$remove();
        //
        //         for (var i in $scope.stamps) {
        //             if ($scope.stamps[i] === stamp) {
        //                 $scope.stamps.splice(i, 1);
        //             }
        //         }
        //     } else {
        //         $scope.stamps.$remove(function(response) {
        //             $location.path('stamps');
        //         });
        //     }
        // };

        $scope.update = function(isValid) {
            if (isValid) {
                var stamp = $scope.stamp;
                if (!stamp.updated) {
                    stamp.updated = [];
                }
                stamp.updated.push(new Date().getTime());

                stamp.$update(function() {
                    $location.path('stamps/' + stamp._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Stamps.query(function(stamps) {
                $scope.stamps = stamps;
            });
        };

        $scope.findOne = function() {
            Stamps.get({
                stampId: $stateParams.stampId
            }, function(stamp) {
                $scope.stamp = stamp;
            });
        };

        $scope.date = function(stamp) {
            var date = stamp.created;
            if(stamp.updated) {
                date = stamp.updated;
            }

            return date;
        };
    }
]);

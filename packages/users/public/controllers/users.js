'use strict';

angular.module('mean.users').controller('UsersController', ['$scope', '$rootScope', '$http', '$location', '$stateParams', 'Global', 'Users',
    function($scope, $rootScope, $http, $location, $stateParams, Global, Users) {
        $scope.find = function() {
            //GET:user/
            Users.query(function(users) {
                $scope.users = users;
            });
        };

        $scope.findOne = function() {
            //GET:user/:userId
            Users.get({
                userId: $stateParams.userId
            }, function(user) {
                $scope.user = user;
            });
        };
      }
]);

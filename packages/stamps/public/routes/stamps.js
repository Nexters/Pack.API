'use strict';

angular.module('mean.stamps').config(['$stateProvider',
    function($stateProvider) {
        // Check if the user is connected
        var checkLoggedin = function($q, $timeout, $http, $location) {
            // Initialize a new promise
            var deferred = $q.defer();

            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
                // Authenticated
                if (user !== '0') $timeout(deferred.resolve);

                // Not Authenticated
                else {
                    $timeout(deferred.reject);
                    $location.url('/login');
                }
            });

            return deferred.promise;
        };

      $stateProvider.
      state('all stamps',{
        url:'/stamps',
        templateUrl:'stamps/views/index.html',
        resolve:{
          loggedin: checkLoggedin
        }
      }).
      state('new stamp', {
        url:'/stamps/new',
        templateUrl: 'stamps/views/new.html',
        resolve:{
          loggedin: checkLoggedin
        }
      }).
      state('edit stamp', {
        url:'/stamps/:stampId/edit',
        templateUrl: 'stamps/views/edit.html',
        resolve:{
          loggedin: checkLoggedin
        }
      }).
      state('stamp', {
        url: '/stamps/:stampId',
        templateUrl: 'stamps/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });

    }
]);

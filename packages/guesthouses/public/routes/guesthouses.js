'use strict';

angular.module('mean.guesthouses').config(['$stateProvider',
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
      state('all guesthouses',{
        url:'/guesthouses',
        templateUrl:'guesthouses/views/index.html',
        resolve:{
          loggedin: checkLoggedin
        }
      }).
      state('new guesthouse', {
        url:'/guesthouses/new',
        templateUrl: 'guesthouses/views/new.html',
        resolve:{
          loggedin: checkLoggedin
        }
      }).
      state('edit guesthouse', {
        url:'/guesthouses/:guesthouseId/edit',
        templateUrl: 'guesthouses/views/edit.html',
        resolve:{
          loggedin: checkLoggedin
        }
      }).
      state('guesthouse', {
        url: '/guesthouses/:guesthouseId',
        templateUrl: 'guesthouses/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });

    }
]);

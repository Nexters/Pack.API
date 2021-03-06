'use strict';

angular.module('mean.places').config(['$stateProvider',
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
        state('all places', {
            url: '/places',
            templateUrl: 'places/views/index.html',
            resolve:{
                loggedin: checkLoggedin 
            }
        }).
        state('new place', {
            url:'/places/new',
            templateUrl: 'places/views/new.html',
            resolve:{
                loggedin: checkLoggedin 
            }
        }).
        state('edit place', {
            url:'/places/:stationId/edit',
            templateUrl: 'places/views/edit.html',
            resolve:{
              loggedin: checkLoggedin 
            }
        }).
        state('place', {
            url: '/places/:stationId',
            templateUrl: 'places/views/view.html',
            resolve: {
              loggedin: checkLoggedin 
            }
        });
    }
]);

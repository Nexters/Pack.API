'use strict';

angular.module('mean.stations').config(['$stateProvider',
    function($stateProvider) {

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
      state('all stations',{
        url:'/stations',
        templateUrl:'stations/views/index.html',
        resolve:{
          loggedin: checkLoggedin
        }
      }).
      state('new station', {
        url:'/stations/new',
        templateUrl: 'stations/views/new.html',
        resolve:{
          loggedin: checkLoggedin
        }
      }).
      state('edit station', {
        url:'/stations/:stationId/edit',
        templateUrl: 'stations/views/edit.html',
        resolve:{
          loggedin: checkLoggedin
        }
      }).
      state('station', {
        url: '/stations/:stationId',
        templateUrl: 'stations/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
    }
    /**function($stateProvider) {
        $stateProvider.state('stations example page', {
            url: '/stations/example',
            templateUrl: 'stations/views/index.html'
        });
    }*/
]);

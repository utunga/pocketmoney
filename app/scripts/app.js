'use strict';

angular.module('ang4App', ['restangular'])
.config(function ($routeProvider, RestangularProvider, $httpProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/account/:accountId', {
      templateUrl: 'views/account.html',
      controller: 'AccountCtrl'
    })
    .when('/settings', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

    /* apparently this is a dreadful nasty hack but seems to be
       required to get CORS working in dev at least. Not needed in prod but
       won't do any harm */
    delete $httpProvider.defaults.headers.common["X-Requested-With"]

    RestangularProvider.setBaseUrl('http://localhost\\:2403');

    RestangularProvider.setRestangularFields({
      id: '_id.$oid'
    });
    
    RestangularProvider.setRequestInterceptor(function(elem, operation, what) {
      if (operation === 'put') {
        elem._id = undefined;
        return elem;
      }
      return elem;
    })
})
.directive('footer', function () {
    return {
        restrict: 'A', //This menas that it will be used as an attribute and NOT as an element.        replace: true,
        //scope: {user: '='}, // 
        templateUrl: "views/footer.html",
        controller: ['$scope', '$location', function ($scope, $location) {
           $scope.activeWhen = function(path, prefix) {
              var cur_path = $location.path().substr(0, path.length);
              if (cur_path == path) {
                  if($location.path().substr(0).length > 1 && path.length == 1 )
                      return prefix;
                  else
                      return prefix +" active";
              } else {
                  return prefix;
              }
          }
        }]
    }
});
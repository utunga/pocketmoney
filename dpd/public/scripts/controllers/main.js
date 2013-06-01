'use strict';

angular.module('ang4App')
  .controller('MainCtrl', function ($scope, Restangular) {
  	$scope.accounts = Restangular.all("accounts").getList();
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

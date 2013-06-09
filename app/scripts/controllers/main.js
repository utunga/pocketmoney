'use strict';

angular.module('ang4App')
.controller('MainCtrl', function ($scope, Restangular, $q) {
	$scope.accounts = Restangular.all("accounts").getList();

	// this works, with all this deferred madness
	// but surely, surely! there is a better way?
	$scope.accounts.then(function(accounts) {
		_.each(accounts, function(account) {
			var entries = Restangular.all("entries")
			 .getList({accountId:account.id});
			entries.then(function(entries) {
				var balance = 0;
				_.each(entries, function(entry) {
					balance = balance + entry.amt;
				});
				account.balance = balance;
			});
		});
	});
})
.controller('AccountCtrl', function ($scope, Restangular, $routeParams) {
	var accountId = $routeParams.accountId;
	$scope.account = Restangular.one("accounts", accountId).get();
	$scope.account.then(function(account) {

		$scope.entries = Restangular.all("entries")
			 .getList({accountId:accountId});
		// this works, with all this deferred madness
		// but surely, surely! there is a better way?
		$scope.entries.then(function(entries) {
			var balance = 0;
			_.each(entries, function(entry) {
				balance = balance + entry.amt;
			});
			account.balance = balance;
		});
	});
});

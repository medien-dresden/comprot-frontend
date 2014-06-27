angular.module('services.storage', [])

.factory('suggestionsService', ['Restangular', function(Restangular) {
	return Restangular.service('suggestions');
}])
.factory('usersService', ['Restangular', function(Restangular) {
   	return Restangular.service('users');
}]);

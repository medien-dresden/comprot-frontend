angular.module('services.storage', [])

.factory('suggestionService', ['Restangular', function(Restangular) {
	return Restangular.service('suggestions');
}])

.factory('searchService', ['Restangular', function(Restangular) {
	return Restangular.service('searches');
}])

.factory('userService', ['Restangular', function(Restangular) {
   	return Restangular.service('users');
}]);

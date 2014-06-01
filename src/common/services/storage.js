angular.module('services.storage', [])

.factory('suggestionsService', ['Restangular', function(Restangular) {
	return Restangular.service('suggestions');
}])

.factory('workbenchService', ['Restangular', function(Restangular) {
	return Restangular.service('workbench');
}]);
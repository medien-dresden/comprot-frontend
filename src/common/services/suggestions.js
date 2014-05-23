angular.module('services.suggestions', [])

.factory('suggestionsService', ['Restangular', function(Restangular) {
	return Restangular.service('suggestions');
}]);
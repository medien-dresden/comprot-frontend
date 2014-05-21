var suggestions = angular.module('services.suggestions', []);

suggestions.factory('SuggestionsService', ['Restangular', function(Restangular) {
	return Restangular.service('suggestions');
}]);
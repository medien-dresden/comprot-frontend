angular.module('app.search.box', ['services.suggestions'])

.controller('SearchBoxCtrl', ['$scope', 'suggestionsService',
		function ($scope, suggestionsService) {
	
    $scope.getSuggestions = function(input) {
        return suggestionsService.getList({query: input}).then(function(list) {
        	return list;
        });
    };

}]);
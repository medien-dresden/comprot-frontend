angular.module('app.search.box', ['services.storage'])

.controller('SearchBoxCtrl', ['$scope', 'suggestionsService',
		function ($scope, suggestionsService) {
	
    $scope.getSuggestions = function(input) {
        return suggestionsService.getList({filter: input}).then(function(list) {
        	return list;
        });
    };

}]);
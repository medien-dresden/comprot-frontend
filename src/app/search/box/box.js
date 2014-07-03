angular.module('app.search.box', [])

.controller('SearchBoxCtrl', ['$scope', 'suggestionService',
		function ($scope, suggestionService, searchConfig) {

    $scope.getSuggestions = function(input) {
        return suggestionService.getList({filter: input}).then(function(list) {
        	return list;
        });
    };

}]);
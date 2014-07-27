angular.module('app.search.box', ['services.storage'])

.controller('SearchBoxCtrl', ['$rootScope', '$scope', '$routeParams', '$location', 'suggestionService',
		function ($rootScope, $scope, $routeParams, $location, suggestionService) {

    // FIXME insert search query when result page is shown

    $scope.getSuggestions = function(input) {
        return suggestionService.getList({q: input}).then(function(list) {
        	return list;
        });
    };

    $scope.search = function(query) {
        if (!!query && query.length > 0) {
            $location.path('/results/' + query);
        }
    };

}]);

angular.module('app.search.box', ['services.storage'])

.controller('SearchBoxCtrl', ['$rootScope', '$scope', '$location', 'suggestionService',
		function ($rootScope, $scope, $location, suggestionService) {

    $scope.query = "";

    $scope.$on('queryChanged', function(event, args) {
        $scope.query = args.query;
    });

    $scope.getSuggestions = function(input) {
        return suggestionService.getList({q: input}).then(function(list) {
        	return list;
        });
    };

    $scope.search = function(query) {
        if (!!query && query.length > 0) {
            $location.path('/search/' + query);
        }
    };

}]);

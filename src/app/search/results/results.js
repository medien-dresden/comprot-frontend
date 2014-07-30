angular.module('app.search.results', ['services.storage'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/search/:query', {
        templateUrl: 'search/results/results.tpl.html',
        controller: 'ResultsCtrl'
    });
}])

.controller('ResultsCtrl', ['$scope', '$routeParams', 'entityService',
        function ($scope, $routeParams, entityService) {
    $scope.result = [];

    $scope.showCompounds = true;
    $scope.showTargets = true;
    
    $scope.totalPages = 0;
    $scope.totalElements = 0;
    $scope.currentPage = 0;

    $scope.showTypes = function(item){
        return (item.type === 'COMPOUND' && $scope.showCompounds) ||
            (item.type === 'TARGET' && $scope.showTargets);
    };
    
    $scope.pageSelected = function(page) {
        $scope.search($routeParams.query, page - 1);
    };

    $scope.search = function(query, page) {
        entityService.getList({q: query, page: page}).then(function(list) {
            $scope.result = list;
            $scope.totalPages = list.page.totalPages;
            $scope.totalElements = list.page.totalElements;
        });
    };

    $scope.search($routeParams.query, 0);

}]);

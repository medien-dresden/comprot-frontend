angular.module('app.search.results', ['services.storage'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/results/:query', {
        templateUrl: 'search/results/results.tpl.html',
        controller: 'ResultsCtrl'
    });
}])

.controller('ResultsCtrl', ['$scope', '$routeParams', 'entityService',
        function ($scope, $routeParams, entityService) {
    $scope.result = [];

    $scope.showDrugs = true;
    $scope.showProteins = true;
    
    $scope.totalPages = 0;
    $scope.totalElements = 0;
    $scope.currentPage = 0;

    $scope.showTypes = function(item){
        return (item.type === 'DRUG' && $scope.showDrugs) ||
            (item.type === 'PROTEIN' && $scope.showProteins);
    };
    
    $scope.pageSelected = function() {
        $scope.search($routeParams.query, $scope.currentPage);
    }; 

    $scope.search = function(query, page) {
        return entityService.getList({q: query, page: page}).then(function(list) {
            $scope.result = list;
            $scope.totalPages = list.page.totalPages;
            $scope.totalElements = list.page.totalElements;
        });
    };

    $scope.search($routeParams.query, 0);

}]);

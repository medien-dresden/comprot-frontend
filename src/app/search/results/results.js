angular.module('app.search.results', ['services.storage'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/results/:query', {
        templateUrl: 'search/results/results.tpl.html',
        controller: 'ResultsCtrl'
    });
}])

.controller('ResultsCtrl', ['$scope', '$routeParams', 'entityService',
        function ($scope, $routeParams, entityService) {
    $scope.result = {};

    $scope.search = function(query, page) {
        entityService.getList({q: query, page: page}).then(function(list) {
            $scope.result = list;
        });
    };

    $scope.search($routeParams.query, 0);

}]);

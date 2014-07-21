angular.module('app.results', [])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/results', {
        templateUrl: 'results/results.tpl.html',
        controller: 'ResultsCtrl',
    });
}])

.controller('ResultsCtrl', ['$scope', function ($scope) {

}]);

function ResultsAccordionCtrl($scope) {
  $scope.oneAtATime = true;
}

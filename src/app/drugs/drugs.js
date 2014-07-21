angular.module('app.drugs', [])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/drugs', {
        templateUrl: 'drugs/drugs.tpl.html',
        controller: 'DrugsCtrl',
    });
}])

.controller('DrugsCtrl', ['$scope', function ($scope) {
	
}]);

function AccordionCtrl($scope) {
  $scope.oneAtATime = true;
}
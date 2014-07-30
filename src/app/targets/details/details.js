angular.module('app.targets.details', [])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/targets/:id', {
        templateUrl: 'targets/details/details.tpl.html',
        controller: 'TargetDetailsCtrl'
    });
}])

.controller('TargetDetailsCtrl', ['$scope', '$routeParams',
        function ($scope, $routeParams) {
    $scope.id = $routeParams.id;

}]);
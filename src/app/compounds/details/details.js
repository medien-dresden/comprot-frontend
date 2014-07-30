angular.module('app.compounds.details', [])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/compounds/:id', {
        templateUrl: 'compounds/details/details.tpl.html',
        controller: 'CompoundDetailsCtrl'
    });
}])

.controller('CompoundDetailsCtrl', ['$scope', '$routeParams',
        function ($scope, $routeParams) {
    $scope.id = $routeParams.id;

}]);
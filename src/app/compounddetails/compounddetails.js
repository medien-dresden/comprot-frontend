angular.module('app.compounddetails', [])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/compounddetails', {
        templateUrl: 'compounddetails/compounddetails.tpl.html',
        controller: 'CompoundDetailsCtrl',
    });
}])

.controller('CompoundDetailsCtrl', ['$scope', function ($scope) {

}]);
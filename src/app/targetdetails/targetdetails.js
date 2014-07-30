angular.module('app.targetdetails', [])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/targetdetails', {
        templateUrl: 'targetdetails/targetdetails.tpl.html',
        controller: 'TargetDetailsCtrl',
    });
}])

.controller('TargetDetailsCtrl', ['$scope', 'entityService', function ($scope, entityService) {

}]);

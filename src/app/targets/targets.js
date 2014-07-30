angular.module('app.targets', [])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/targets', {
        templateUrl: 'targets/targets.tpl.html',
        controller: 'TargetsCtrl',
    });
}])

.controller('TargetsCtrl', ['$scope', function ($scope) {

}]);
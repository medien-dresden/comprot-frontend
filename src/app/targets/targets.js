angular.module('app.targets', ['app.targets.details'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/targets', {
        templateUrl: 'targets/targets.tpl.html',
        controller: 'TargetsCtrl'
    });
}])

.controller('TargetsCtrl', ['$scope', function ($scope) {

}]);
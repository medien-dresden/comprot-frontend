angular.module('app.dashboard', [])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboard', {
        templateUrl: 'dashboard/dashboard.tpl.html',
        controller: 'DashboardCtrl',
    });
}])

.controller('DashboardCtrl', ['$scope', function ($scope) {
	
}]);
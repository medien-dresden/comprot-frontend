var dashboard = angular.module('dashboard', []);

dashboard.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/dashboard', {
        templateUrl: 'dashboard/dashboard.tpl.html',
        controller: 'DashboardCtrl',
    });
}]);

dashboard.controller('DashboardCtrl', ['$scope', function ($scope) {
	
}]);
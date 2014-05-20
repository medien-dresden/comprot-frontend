var app = angular.module('app', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
	'templates.app',
	'templates.common',
    'dashboard'
]);

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.otherwise({ redirectTo: '/dashboard' });
}]);

app.controller('AppCtrl', ['$scope', function($scope) {

}]);

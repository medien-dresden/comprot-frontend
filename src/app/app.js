angular.module('app', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'restangular',

	'templates.app',
	'templates.common',

	'services.breadcrumbs',
    'services.httpRequestTracker',
	'services.suggestions',

    'app.search',
    'app.dashboard',
    'app.drugs'
])

.config(['$routeProvider', '$locationProvider', 'RestangularProvider',
		function ($routeProvider, $locationProvider, RestangularProvider) {
	RestangularProvider.setBaseUrl('http://localhost:8080/');
    $routeProvider.otherwise({ redirectTo: '/dashboard' });
}])

.controller('AppCtrl', ['$scope', '$location', 'breadcrumbs', 'httpRequestTracker',
		function($scope, $location, breadcrumbs, httpRequestTracker) {

	$scope.isActiveView = function (path) {
		return path === breadcrumbs.getFirst().name;
	};

    $scope.hasPendingRequests = function () {
        return httpRequestTracker.hasPendingRequests();
    };
    
}]);

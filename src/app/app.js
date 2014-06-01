angular.module('app', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'ui.bootstrap',
    'restangular',
    'toaster',

	'templates.app',
	'templates.common',

	'services.breadcrumbs',
    'services.httpRequestTracker',
	'services.storage',

    'app.search',
    'app.dashboard',
    'app.drugs'
])

.config(['$routeProvider', '$locationProvider', 'RestangularProvider',
		function ($routeProvider, $locationProvider, RestangularProvider) {
	RestangularProvider.setBaseUrl('http://localhost:8080/');
    $routeProvider.otherwise({ redirectTo: '/dashboard' });
}])

.controller('AppCtrl', ['$scope', '$location', 'breadcrumbs', 'httpRequestTracker', 'toaster',
		function($scope, $location, breadcrumbs, httpRequestTracker, toaster) {

    // store this somehow
    $scope.model = {
        drugs: 0,
        proteins: 0,
        diseases: 0
    };
    
	$scope.isActiveView = function (path) {
		return path === breadcrumbs.getFirst().name;
	};

    $scope.hasPendingRequests = function () {
        return httpRequestTracker.hasPendingRequests();
    };
    
}]);

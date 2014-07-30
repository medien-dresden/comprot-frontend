angular.module('app', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'ui.bootstrap',
    'restangular',
    'toaster',

	'templates.app',
	'templates.common',

    'security',
	'services.breadcrumbs',
    'services.httpRequestTracker',
	'services.storage',

    'app.search',
    'app.dashboard',
    'app.compounds',
    'app.targets'
])

//TODO: move those messages to a separate module
.constant('I18N.MESSAGES', {
    'login.reason.notAuthorized':"You do not have the necessary access permissions. Do you want to login as someone else?",
    'login.reason.notAuthenticated':"You must be logged in to access this part of the application.",
    'login.error.invalidCredentials': "Login failed. Please check your credentials and try again.",
    'login.error.serverError': "There was a problem with authenticating: {{exception}}.",
    'login.error.validationFailure': "Please review your statements."
})

.config(['$routeProvider', '$locationProvider', 'RestangularProvider',
		function ($routeProvider, $locationProvider, RestangularProvider) {

	RestangularProvider.setBaseUrl('http://localhost:8080/api');
    RestangularProvider.setDefaultHeaders({
        'Content-Type': 'application/vnd.comprot-v1.0+json',
        'Accept': 'application/vnd.comprot-v1.0+json'
    });

    RestangularProvider.setRestangularFields({
        id: "entityId"
    });

    $routeProvider.otherwise({ redirectTo: '/dashboard' });
}])

.controller('AppCtrl', ['$scope', '$location', 'breadcrumbs', 'httpRequestTracker', 'toaster', 'security',
		function($scope, $location, breadcrumbs, httpRequestTracker, toaster, security) {

    // FIXME delete
    $scope.model = {
        compounds: 0,
        targets: 0,
        diseases: 0
    };

	$scope.isActiveView = function (path) {
		return path === breadcrumbs.getFirst().name;
	};

    $scope.hasPendingRequests = function () {
        return httpRequestTracker.hasPendingRequests();
    };
    
}]);

var app = angular.module('app', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'restangular',

	'templates.app',
	'templates.common',

	'services.breadcrumbs',
	'services.suggestions',

    'dashboard',
    'drugs'
]);

app.config(['$routeProvider', '$locationProvider', 'RestangularProvider',
		function ($routeProvider, $locationProvider, RestangularProvider) {
	RestangularProvider.setBaseUrl('http://localhost:8080/');
    $routeProvider.otherwise({ redirectTo: '/dashboard' });
}]);

app.controller('AppCtrl', ['$scope', '$location', 'breadcrumbs', 'SuggestionsService',
		function($scope, $location, breadcrumbs, SuggestionsService) {

    $scope.breadcrumbs = breadcrumbs;

	$scope.isCurrentlyActive = function (path) {
		return path === breadcrumbs.getFirst().name;
	};

    $scope.getSearchSuggestions = function(input) {
        return SuggestionsService.getList({query: input}).then(function(list) {
        	return list;
        });
    }
    
}]);

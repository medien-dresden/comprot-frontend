var drugs = angular.module('drugs', []);

drugs.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/drugs', {
        templateUrl: 'drugs/drugs.tpl.html',
        controller: 'DrugsCtrl',
    });
}]);

drugs.controller('DrugsCtrl', ['$scope', function ($scope) {
	
}]);
angular.module('app.compounds', [])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/compounds', {
        templateUrl: 'compounds/compounds.tpl.html',
        controller: 'CompoundsCtrl',
    });
}])

.controller('CompoundsCtrl', ['$scope', function ($scope) {
	
}]);

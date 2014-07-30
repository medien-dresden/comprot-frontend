angular.module('app.compounds', ['app.compounds.details'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/compounds', {
        templateUrl: 'compounds/compounds.tpl.html',
        controller: 'CompoundsCtrl'
    });
}])

.controller('CompoundsCtrl', ['$scope', function ($scope) {
	
}]);

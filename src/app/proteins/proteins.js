angular.module('app.proteins', [])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/proteins', {
        templateUrl: 'proteins/proteins.tpl.html',
        controller: 'ProteinsCtrl',
    });
}])

.controller('ProteinsCtrl', ['$scope', function ($scope) {

}]);
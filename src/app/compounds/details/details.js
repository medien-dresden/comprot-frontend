angular.module('app.compounds.details', [])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/compounds/:id', {
        templateUrl: 'compounds/details/details.tpl.html',
        controller: 'CompoundDetailsCtrl'
    });
}])

.controller('CompoundDetailsCtrl', ['$scope', '$routeParams', 'entityService', '$location', 'workbenchService',
        function ($scope, $routeParams, entityService, $location, workbenchService) {
    $scope.id = $routeParams.id;
    $scope.entity = null;
    $scope.name = "";
    $scope.type = "";
    $scope.sourceId = "";
    $scope.synonyms = [];
    $scope.bindings = [];

    entityService.one($scope.id).get().then(function(entity) {
        $scope.entity = entity;
        $scope.name = entity.name;
        $scope.type = entity.type;
        $scope.sourceId = entity.sourceId;
        $scope.synonyms = entity.synonyms;
    });

    entityService.one($scope.id).getList('bindings').then(function(bindings) {
        $scope.bindings = bindings;
    });

    $scope.addToWorkbench = function() {
        workbenchService.add($scope.entity);
    };

    $scope.showDetails = function(binding) {
        $location.path('targets/' + binding.target.id);
    };
}]);
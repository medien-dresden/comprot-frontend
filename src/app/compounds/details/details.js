angular.module('app.compounds.details', [])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/compounds/:id', {
        templateUrl: 'compounds/details/details.tpl.html',
        controller: 'CompoundDetailsCtrl'
    });
}])

.controller('CompoundDetailsCtrl', ['$scope', '$routeParams', 'entityService', '$location',
        function ($scope, $routeParams, entityService, $location) {
    $scope.id = $routeParams.id;
    $scope.name = "";
    $scope.type = "";
    $scope.sourceId = "";
    $scope.synonyms = [];
    $scope.bindings = [];

    entityService.one($scope.id).get().then(function(entity) {
        $scope.name = entity.name;
        $scope.type = entity.type;
        $scope.sourceId = entity.sourceId;
        $scope.synonyms = entity.synonyms;
    });

    entityService.one($scope.id).getList('bindings').then(function(bindings) {
        $scope.bindings = bindings;
    });

    $scope.showDetails = function(binding) {
        $location.path('targets/' + binding.target.id);
    };
}]);
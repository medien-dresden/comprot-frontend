angular.module('app.targets.details', [])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/targets/:id', {
        templateUrl: 'targets/details/details.tpl.html',
        controller: 'TargetDetailsCtrl'
    });
}])

.controller('TargetDetailsCtrl', ['$scope', '$routeParams', 'entityService', '$location',
        function ($scope, $routeParams, entityService, $location) {
    $scope.id = $routeParams.id;
    $scope.name = "";
    $scope.type = "";
    $scope.sourceId = "";
    $scope.taxonomyId = "";
    $scope.synonyms = [];
    $scope.bindings = [];

    entityService.one($scope.id).get().then(function(entity) {
        $scope.name = entity.name;
        $scope.type = entity.type;
        $scope.sourceId = entity.sourceId;
        $scope.taxonomyId = entity.taxonomyId;
        $scope.synonyms = entity.synonyms;
    });

    entityService.one($scope.id).getList('bindings').then(function(bindings) {
        $scope.bindings = bindings;
    });

    $scope.showDetails = function(binding) {
        $location.path('compounds/' + binding.compound.id);
    };
}]);
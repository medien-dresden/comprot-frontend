angular.module('app.targets.details', [])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/targets/:id', {
        templateUrl: 'targets/details/details.tpl.html',
        controller: 'TargetDetailsCtrl'
    });
}])

.controller('TargetDetailsCtrl', ['$scope', '$routeParams', 'entityService',
        function ($scope, $routeParams, entityService) {
    $scope.id = $routeParams.id;
    $scope.name = "";
    $scope.type = "";
    $scope.sourceId = "";
    $scope.taxonomyId = "";
    $scope.synonyms = [];
    $scope.compounds = [];

    entityService.one($scope.id).get().then(function(entity) {
        $scope.name = entity.name;
        $scope.type = entity.type;
        $scope.sourceId = entity.sourceId;
        $scope.taxonomyId = entity.taxonomyId;
        $scope.synonyms = entity.synonyms;
    });

    entityService.one($scope.id).one('bindings').get().then(function(binding) {
        $scope.compounds = binding.content;
    });
}]);
angular.module('app.compounds.details', [])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/compounds/:id', {
        templateUrl: 'compounds/details/details.tpl.html',
        controller: 'CompoundDetailsCtrl'
    });
}])

.controller('CompoundDetailsCtrl', ['$scope', '$routeParams', 'entityService',
        function ($scope, $routeParams, entityService) {
    $scope.id = $routeParams.id;
    $scope.name = "";
    $scope.type = "";
    $scope.sourceId = "";
    $scope.synonyms = [];
    $scope.targets = [];

    entityService.one($scope.id).get().then(function(entity) {
        $scope.name = entity.name;
        $scope.type = entity.type;
        $scope.sourceId = entity.sourceId;
        $scope.synonyms = entity.synonyms;
    });

    entityService.one($scope.id).one('bindings').get().then(function(binding) {
        $scope.targets = binding.content;
    });
}]);
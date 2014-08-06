angular.module('app.compounds', ['app.compounds.details'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/compounds', {
        templateUrl: 'compounds/compounds.tpl.html',
        controller: 'CompoundsCtrl'
    });
}])

.controller('CompoundsCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'entityService', 'workbenchService',
        function ($rootScope, $scope, $location, $routeParams, entityService, workbenchService) {
    $scope.entities = [];

    var fetchCompounds = function() {
        workbenchService.requestWorkbench().then(function (workbench) {
            $scope.entities = workbench.compounds;
            _($scope.entities).each(function(entity) {
                entity.isSelected = false;
            });
        });
    };

    $rootScope.$on('user:loggedOut', $scope.$back);

    $scope.removeSelectionFromWorkbench = function() {
        workbenchService.remove($scope.selectedEntities()).then(fetchCompounds);
    };

    $scope.showDetails = function(item) {
        $location.path((item.type === 'TARGET' ? 'targets/' : 'compounds/') + item.id);
    };

    $scope.allEntitiesSelected = function() {
        var allEntitiesSelected = true;

        if ($scope.entities.length < 1) {
            return false;
        }

        angular.forEach($scope.entities, function(entity) {
            allEntitiesSelected &= entity.isSelected;
        });

        return allEntitiesSelected;
    };

    $scope.selectAllChanged = function() {
        var isSelected = !$scope.allEntitiesSelected();
        angular.forEach($scope.entities, function(entity) {
            entity.isSelected = isSelected;
        });
    };

    $scope.selectedEntities = function() {
        var selectedEntities = [];

        angular.forEach($scope.entities, function(entity) {
            if (entity.isSelected) {
                selectedEntities.push(entity);
            }
        });

        return selectedEntities;
    };

    fetchCompounds();

}]);

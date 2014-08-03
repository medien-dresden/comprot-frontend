angular.module('app.compounds', ['app.compounds.details'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/compounds', {
        templateUrl: 'compounds/compounds.tpl.html',
        controller: 'CompoundsCtrl'
    });
}])

.controller('CompoundsCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'entityService', 'workbenchService',
        function ($rootScope, $scope, $location, $routeParams, entityService, workbenchService) {
    $scope.workbenchitems = [];

    $scope.selectedAll = false;

    $scope.totalPages = 0;
    $scope.totalElements = 0;
    $scope.currentPage = 0;

    $scope.showDetails = function(item) {
        $location.path((item.type === 'TARGET' ? 'targets/' : 'compounds/') + item.id);
    };

    $scope.allEntitiesSelected = function() {
        var allEntitiesSelected = true;

        if ($scope.workbenchitems.length < 1) {
            return false;
        }

        angular.forEach($scope.workbenchitems, function(entity) {
            allEntitiesSelected &= entity.isSelected;
        });

        return allEntitiesSelected;
    };

    $scope.selectAllChanged = function() {
        var isSelected = !$scope.allEntitiesSelected();
        angular.forEach($scope.workbenchitems, function(entity) {
            entity.isSelected = isSelected;
        });
    };

    $scope.selectedEntities = function() {
        var selectedEntities = [];

        angular.forEach($scope.workbenchitems, function(entity) {
            if (entity.isSelected) {
                selectedEntities.push(entity);
            }
        });

        return selectedEntities;
    };

}]);

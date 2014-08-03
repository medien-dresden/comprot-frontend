angular.module('app.search.results', ['services.storage', 'services.workbench'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/search/:query', {
        templateUrl: 'search/results/results.tpl.html',
        controller: 'ResultsCtrl'
    });
}])

.controller('ResultsCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'entityService', 'workbenchService',
        function ($rootScope, $scope, $location, $routeParams, entityService, workbenchService) {
    $scope.result = [];

    $scope.showCompounds = true;
    $scope.showTargets = true;

    $scope.selectedAll = false;

    $scope.totalPages = 0;
    $scope.totalElements = 0;
    $scope.currentPage = 0;

    $scope.showDetails = function(item) {
        $location.path((item.type === 'TARGET' ? 'targets/' : 'compounds/') + item.id);
    };

    $scope.showTypes = function(item){
        return (item.type === 'COMPOUND' && $scope.showCompounds) ||
            (item.type === 'TARGET' && $scope.showTargets);
    };
    
    $scope.pageSelected = function(page) {
        $scope.currentPage = page;
        $scope.search($routeParams.query, page - 1);
    };

    $scope.search = function(query, page) {
        entityService.getList({q: query, page: page}).then(function(list) {
            angular.forEach(list, function (entity) {
                entity.isSelected = false;
            });

            $scope.result = list;
            $scope.totalPages = list.page.totalPages;
            $scope.totalElements = list.page.totalElements;
        });
    };

    $scope.allEntitiesSelected = function() {
        var allEntitiesSelected = true;

        if ($scope.result.length < 1) {
            return false;
        }

        angular.forEach($scope.result, function(entity) {
            allEntitiesSelected &= entity.isSelected;
        });

        return allEntitiesSelected;
    };

    $scope.selectAllChanged = function() {
        var isSelected = !$scope.allEntitiesSelected();
        angular.forEach($scope.result, function(entity) {
            entity.isSelected = isSelected;
        });
    };

    $scope.selectedEntities = function() {
        var selectedEntities = [];

        angular.forEach($scope.result, function(entity) {
            if (entity.isSelected) {
                selectedEntities.push(entity);
            }
        });

        return selectedEntities;
    };

    $scope.addSelectionToWorkbench = function() {
        workbenchService.add($scope.selectedEntities());
    };

    if (!angular.isUndefined($routeParams.query) && $routeParams.query.length > 0) {
        $rootScope.$broadcast('queryChanged', { query: $routeParams.query });
    }

    $scope.search($routeParams.query, 0);

}]);

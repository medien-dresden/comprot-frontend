angular.module('app.targets', ['app.targets.details'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/targets', {
        templateUrl: 'targets/targets.tpl.html',
        controller: 'TargetsCtrl'
    });
}])

.controller('TargetsCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'entityService', 'workbenchService',
        function ($rootScope, $scope, $location, $routeParams, entityService, workbenchService) {
            $scope.entities = [];

            var fetchCompounds = function() {
                workbenchService.requestWorkbench().then(function (workbench) {
                    $scope.entities = workbench.targets;
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
                $location.path((item.type === 'COMPOUND' ? 'compounds/' : 'targets/') + item.id);
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

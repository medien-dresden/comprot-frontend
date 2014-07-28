describe('appplication', function() {

	var $q,
		$scope,
		breadcrumbs,
		httpRequestTracker;

	beforeEach(module('app'));

	beforeEach(inject(function($rootScope, $controller, _$q_,
			_breadcrumbs_, _httpRequestTracker_) {

		breadcrumbs = _breadcrumbs_;
		httpRequestTracker = _httpRequestTracker_;

		$q = _$q_;
        $scope = $rootScope.$new();

        $controller('AppCtrl', {
        	$scope: $scope
        });
    }));

	describe('controller', function() {

		xit('should know the active navigation root', function() {
			spyOn(breadcrumbs, 'getFirst').andReturn({ name: 'someView' });

			expect($scope.isActiveView('someView')).toBeTruthy();
			expect($scope.isActiveView('someDifferentView')).toBeFalsy();
		});

		xit('should be aware of pending requests', function() {
			spyOn(httpRequestTracker, 'hasPendingRequests').andReturn(true);

			expect($scope.hasPendingRequests()).toBeTruthy();
		});

	});

});

describe('appplication', function() {

	var $q,
		$scope,
		breadcrumbs,
		httpRequestTracker,
		SuggestionsService;

	beforeEach(module('app'));

	beforeEach(inject(function($rootScope, $controller, _$q_,
			_breadcrumbs_, _httpRequestTracker_, _SuggestionsService_) {

		breadcrumbs = _breadcrumbs_;
		httpRequestTracker = _httpRequestTracker_;
		SuggestionsService = _SuggestionsService_;

		$q = _$q_;
        $scope = $rootScope.$new();

        $controller('AppCtrl', {
        	$scope: $scope
        });
    }));

	describe('controller', function() {

		it('should know the active navigation root', function() {
			spyOn(breadcrumbs, 'getFirst').andReturn({ name: 'someView' });

			expect($scope.isCurrentlyActive('someView')).toBeTruthy();
			expect($scope.isCurrentlyActive('someDifferentView')).toBeFalsy();
		});

		it('should be aware of pending requests', function() {
			spyOn(httpRequestTracker, 'hasPendingRequests').andReturn(true);

			expect($scope.hasPendingRequests()).toBeTruthy();
		});

		it('should return a list of search suggestions', function() {
			var deferred = $q.defer(),
				suggestions = ['s1', 's2'];

			spyOn(SuggestionsService, 'getList').andReturn(deferred.promise);

			$scope.getSearchSuggestions('test').then(function(data) {
				expect(data).toBe(suggestions);
			});

			deferred.resolve(suggestions);
			$scope.$apply();

			expect(SuggestionsService.getList)
					.toHaveBeenCalledWith({ query: 'test' });
		});

	});

});
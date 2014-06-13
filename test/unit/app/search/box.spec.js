describe('search', function() {

	var $q,
		$scope,
		suggestionsService;

	beforeEach(module('app'));

	beforeEach(inject(function($rootScope, $controller, _$q_,
			_suggestionsService_) {

		suggestionsService = _suggestionsService_;

		$q = _$q_;
        $scope = $rootScope.$new();

        $controller('SearchBoxCtrl', {
        	$scope: $scope
        });
    }));

	describe('box controller', function() {

		it('should return a list of search suggestions', function() {
			var deferred = $q.defer(),
				suggestions = ['s1', 's2'];

			spyOn(suggestionsService, 'getList').andReturn(deferred.promise);

			$scope.getSuggestions('test').then(function(data) {
				expect(data).toBe(suggestions);
			});

			deferred.resolve(suggestions);
			$scope.$apply();

			expect(suggestionsService.getList)
					.toHaveBeenCalledWith({ filter: 'test' });
		});

	});

});
angular.module('services.storage', ['restangular'])

.config(['RestangularProvider', function(RestangularProvider) {
	RestangularProvider.setResponseExtractor(function(data, operation) {
	    var extractedData,
            setupSelfLink = function(data) {
            angular.forEach(data.links, function(link) {
                if (!angular.isUndefined(link.rel) && link.rel === 'self') {
                    data.href = link.href;
                    return;
                }
            });
        };

        if (operation === 'getList' && !angular.isUndefined(data.page)) {
            angular.forEach(data.content, function(item) {
                setupSelfLink(item);
            });
        
            extractedData = data.content;
            extractedData.links = data.links;
            extractedData.page = data.page;
            
        } else {
            setupSelfLink(data);
            extractedData = data;
        }

	    return extractedData;
    });
}])

.factory('suggestionService', ['Restangular', function(Restangular) {
	return Restangular.service('suggestions');
}])

.factory('entityService', ['Restangular', function(Restangular) {
	return Restangular.service('entities');
}])

.factory('userService', ['Restangular', function(Restangular) {
   	return Restangular.service('users');
}]);

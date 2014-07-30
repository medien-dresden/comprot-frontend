angular.module('services.storage', ['restangular'])

.config(['RestangularProvider', function(RestangularProvider) {
	RestangularProvider.setResponseExtractor(function(data, operation) {
	    var extractedData,
            links = {},
            setupLinks = function(data) {
            angular.forEach(data.links, function(link) {
                if (angular.isUndefined(link.rel) || angular.isUndefined(link.href)) {
                    return;
                }

                if (link.rel === 'self') {
                    data.href = link.href;
                } else {
                    links[link.rel] = link.href;
                }
            });

            data.links = links;
        };

        if (operation === 'getList' && !angular.isUndefined(data.page)) {
            angular.forEach(data.content, function(item) {
                setupLinks(item);
            });

            extractedData = data.content;
            extractedData.page = data.page;

        } else {
            extractedData = data;
        }

        setupLinks(data);
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

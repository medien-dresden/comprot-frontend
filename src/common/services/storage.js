angular.module('services.storage', ['restangular'])

.config(['RestangularProvider', function(RestangularProvider) {
    var setupLinks = function (data) {
            angular.forEach(data.links, function (link) {
                if (angular.isUndefined(link.rel) || angular.isUndefined(link.href)) {
                    return;
                }

                if (link.rel === 'self') {
                    data.href = link.href;
                }
            });

            if (angular.isDefined(data.href)) {
                data.id = data.href.split('/').pop();
            }
        };

	RestangularProvider.addResponseInterceptor(function(data, operation) {
        var extractedData;

        if (operation === 'getList' && angular.isDefined(data.page)) {
            angular.forEach(data.content, setupLinks);
            extractedData = data.content;
            extractedData.page = data.page;

        } else if (operation === 'getList' && angular.isUndefined(data.page)) {
            angular.forEach(data, setupLinks);

            extractedData = data;

        } else {
            extractedData = data;
        }

        setupLinks(data);
	    return extractedData;
    });

    RestangularProvider.addFullRequestInterceptor(function(headers) {
        if (!angular.isObject(headers)) {
            return;
        }

        // FIXME gets deleted somehow
        headers['Content-Type'] = 'application/vnd.comprot-v1.0+json';
    });

    RestangularProvider.addElementTransformer('users', false, function(user) {
        user.addRestangularMethod('workbenches', 'getList', 'workbenches');
        return user;
    });

    RestangularProvider.addElementTransformer('workbenches', false, function(workbench) {
        angular.forEach(workbench.targets, setupLinks);
        angular.forEach(workbench.compounds, setupLinks);
        return workbench;
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

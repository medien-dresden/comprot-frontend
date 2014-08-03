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

        if (angular.isObject(data.page)) {
            angular.forEach(data.content, setupLinks);
            extractedData = data.content;
            extractedData.page = data.page;

        } else if (operation === 'getList') {
            angular.forEach(data, setupLinks);
            extractedData = data;

        } else {
            extractedData = data;
        }

        setupLinks(data);
	    return extractedData;
    });

    RestangularProvider.addElementTransformer('users', false, function(user) {
        user.addRestangularMethod('workbenches', 'getList', 'workbenches');
        return user;
    });

    RestangularProvider.addElementTransformer('workbenches', false, function(workbench) {
        if (!angular.isObject(workbench)) {
            return;
        }

        angular.forEach(workbench.targets, setupLinks);
        angular.forEach(workbench.compounds, setupLinks);

        return workbench;
    });

    RestangularProvider.addElementTransformer('bindings', false, function(binding) {
        if (!angular.isObject(binding)) {
            return;
        }

        setupLinks(binding.target);
        setupLinks(binding.compound);

        return binding;
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

angular.module('services.storage', [])

.config(function(RestangularProvider) {
    RestangularProvider.addResponseInterceptor(function(data, operation) {
        var extractedData;

        if (operation === 'getList' && !angular.isUndefined(data.page)) {
            extractedData = data.content;
            extractedData.links = data.links;
            extractedData.page = data.page;
        } else {
            extractedData = data;
        }

        return extractedData;
    });
})

.factory('suggestionService', ['Restangular', function(Restangular) {
	return Restangular.service('suggestions');
}])

.factory('entityService', ['Restangular', function(Restangular) {
	return Restangular.service('entities');
}])

.factory('userService', ['Restangular', function(Restangular) {
   	return Restangular.service('users');
}]);

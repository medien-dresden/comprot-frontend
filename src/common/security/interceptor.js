angular.module('security.interceptor', ['security.retryQueue'])

// This http interceptor listens for authentication failures
.factory('securityInterceptor', ['$injector', '$q', 'securityRetryQueue', 'base64',
        function($injector, $q, queue, base64) {

    var authorizationHeader = null;

    return {
        setAuthorization: function(username, password) {
            authorizationHeader = 'Basic ' + base64.encode(username + ':' + password);
        },

        clearAuthorization: function() {
            authorizationHeader = null;
        },

        'request': function(config) {
            if (authorizationHeader) {
                config.headers['Authorization'] = authorizationHeader;
            }

            return config;
        },

        'responseError': function(rejection) {
            if (rejection.status === 401) {
                // The request bounced because it was not authorized - add a new request to the retry queue
                queue.pushRetryFn('unauthorized-server', function retryRequest() {
                    // We must use $injector to get the $http service to prevent circular dependency
                    return $injector.get('$http')(rejection.config);
                });
            }

            return $q.reject(rejection);
        }
    };
}])

// We have to add the interceptor to the queue as a string because the interceptor depends upon service instances that are not available in the config block.
.config(['$httpProvider', function($httpProvider) { $httpProvider.interceptors.push('securityInterceptor'); }]);
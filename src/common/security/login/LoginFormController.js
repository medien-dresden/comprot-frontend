angular.module('security.login.form', ['services.localizedMessages'])

// The LoginFormController provides the behaviour behind a reusable form to allow users to authenticate.
// This controller and its template (login/form.tpl.html) are used in a modal dialog box by the security service.
.controller('LoginFormController', ['$scope', 'security', 'localizedMessages', 'usersService', 'httpRequestTracker',
        function($scope, security, localizedMessages, usersService, httpRequestTracker) {

    // The model for this form
    $scope.user = {};

    // Field information for validation
    $scope.fields = {};

    // Any error message from failing to login
    $scope.authError = null;

    $scope.isBusy = function() {
        return httpRequestTracker.hasPendingRequests();
    };

    // The reason that we are being asked to login - for instance because we tried to access something to which we are not authorized
    // We could do something different for each reason here but to keep it simple...
    $scope.authReason = null;

    if (security.getLoginReason()) {
        $scope.authReason = security.isAuthenticated() ?
            localizedMessages.get('login.reason.notAuthorized') :
            localizedMessages.get('login.reason.notAuthenticated');
    }

    $scope.register = function() {
        // Clear any previous security errors
        $scope.authError = null;
        $scope.fields = {};

        usersService.post({
            username: $scope.user.username,
            password: $scope.user.password,
            email: $scope.user.email,
            displayName: $scope.user.displayName

        }).then(function(user) {
            security.login($scope.user.username, $scope.user.password, user);

        }, function(responseError) {
            if (responseError.status === 400 || responseError.status === 409) {
                $scope.authError = localizedMessages.get('login.error.validationFailure');
                $scope.invalidFields = [];
                angular.forEach(responseError.data.violations, function(value, key) {
                    this[value.field] = {
                        isInvalid: true,
                        message: value.message
                    };
                }, $scope.fields);
            }
        });
    };

    // Attempt to authenticate the user specified in the form's model
    $scope.login = function() {
        // Clear any previous security errors
        $scope.authError = null;

        // Try to login
        security.login($scope.user.username, $scope.user.password, null).then(function(loggedIn) {
            if (!loggedIn) {
                // If we get here then the login failed due to bad credentials
                $scope.authError = localizedMessages.get('login.error.invalidCredentials');
                security.logout();
            }
        },

        function(x) {
            // If we get here then there was a problem with the login request to the server
            $scope.authError = localizedMessages.get('login.error.serverError');
        });
    };

    $scope.cancel = function() {
        security.cancelLogin();
    };

}]);

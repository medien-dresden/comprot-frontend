// Based loosely around work by Witold Szczerba - https://github.com/witoldsz/angular-http-auth
angular.module('security.service', [
    'security.retryQueue',    // Keeps track of failed requests that need to be retried once the user logs in
    'security.login',         // Contains the login form template and controller
    'ui.bootstrap.modal',     // Used to display the login form as a modal dialog.
    'services.storage',
    'base64'
])

.factory('security', ['$http', '$q', '$location', 'securityRetryQueue', '$modal', 'usersService', 'securityInterceptor',
    function($http, $q, $location, queue, $modal, usersService, securityInterceptor) {

    // Login form dialog stuff
    var loginDialog = null;
    function openLoginDialog() {
        if (loginDialog) {
            return;
        }

        loginDialog = $modal.open({
            templateUrl: 'security/login/form.tpl.html',
            controller: 'LoginFormController',
            keyboard: false,
            backdrop: 'static',
            size: 'sm'
        });

        loginDialog.result.then(onLoginDialogClose);
    }

    function closeLoginDialog(success) {
        if (loginDialog) {
            loginDialog.close(success);
        }
    }

    function onLoginDialogClose(success) {
        loginDialog = null;

        if (success) {
            queue.retryAll();
        } else {
            queue.cancelAll();
        }
    }

    // Register a handler for when an item is added to the retry queue
    queue.onItemAddedCallbacks.push(function(retryItem) {
        if (queue.hasMore()) {
            service.showLogin();
        }
    });

    // The public API of the service
    var service = {

        // Get the first reason for needing a login
        getLoginReason: function() {
            return queue.retryReason();
        },

        // Show the modal login dialog
        showLogin: function() {
            openLoginDialog();
        },

        // Attempt to authenticate a user by the given username and password
        login: function(username, password, userObj) {
            securityInterceptor.setAuthorization(username, password);

            var acceptUser = function(user) {
                service.currentUser = user;

                if (service.isAuthenticated()) {
                    closeLoginDialog(true);
                }

                return service.isAuthenticated();
            };

            if (userObj!== null) {
                return acceptUser(userObj);

            } else {
                return usersService.one('me').get().then(acceptUser, function(something) {
                    // something went wrong
                });
            }
        },

        // Give up trying to login and clear the retry queue
        cancelLogin: function() {
            closeLoginDialog(false);
        },

        // Logout the current user and redirect
        logout: function(redirectTo) {
            securityInterceptor.clearAuthorization();
            service.currentUser = null;
        },

        // Ask the backend to see if a user is already authenticated - this may be from a previous session.
        requestCurrentUser: function() {
            if (service.isAuthenticated()) {
                return $q.when(service.currentUser);
            } else {
                return usersService.one('me').get().then(function(response) {
                    service.currentUser = response.data.user;
                    return service.currentUser;
                });
            }
        },

        // Information about the current user
        currentUser: null,

        // Is the current user authenticated?
        isAuthenticated: function(){
            return !!service.currentUser;
        },
    
        // Is the current user an administrator?
        isAdmin: function() {
            return !!(service.currentUser && service.currentUser.roles.indexOf('ROLE_ADMIN') !== -1);
        }
    };

    return service;
}]);

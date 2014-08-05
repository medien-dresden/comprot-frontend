angular.module('services.workbench', ['security', 'toaster'])

    .factory('workbenchService', ['$rootScope', '$q', 'security', 'toaster',
        function ($rootScope, $q, security, toaster) {

            var workbench = null,
                service = {},

                showSaveSuccess = function() {
                    toaster.pop('success', 'Workbench', 'has been saved');
                },

                requestWorkbench = function() {
                    return security.requestCurrentUser().then(function (user) {
                        return user.workbenches().then(function (workbenches) {
                            return workbench = workbenches[0];
                        });
                    });
                },

                require = function() {
                    return (workbench !== null) ? $q.when(workbench) : requestWorkbench();
                },

                remove = function(items) {
                    require().then(function(wb) {
                        var compounds = wb.compounds,
                            targets   = wb.targets;

                        angular.forEach(items, function(item) {
                            compounds = _.without(compounds, item);
                        });
                        angular.forEach(items, function(item) {
                            targets = _.without(targets, item);
                        });

                        wb.compounds = _.unique(compounds, 'id');
                        wb.targets   = _.unique(targets, 'id');

                        wb.save().then(showSaveSuccess);
                    });
                },

                add = function(items) {
                    require().then(function(wb) {
                        var compounds = _.union(wb.compounds, _.where(items, { type: 'COMPOUND' })),
                            targets   = _.union(wb.targets,   _.where(items, { type: 'TARGET'   }));

                        wb.compounds = _.unique(compounds, 'id');
                        wb.targets   = _.unique(targets, 'id');

                        wb.save().then(showSaveSuccess);
                    });
                };

            $rootScope.$on('user:loggedIn',  function () { requestWorkbench(); });
            $rootScope.$on('user:loggedOut', function () { workbench = null;   });

            service.countTargets = function() {
                return (workbench !== null) ? workbench.targets.length : 0;
            };

            service.countCompounds = function() {
                return (workbench !== null) ? workbench.compounds.length : 0;
            };

            service.getTargets = function() {
                return (workbench !== null) ? workbench.targets : null;
            };

            service.getCompounds = function() {
                return (workbench !== null) ? workbench.compounds : null;
            };

            service.add = function(item) {
                _.isArray(item) ? add(item) : add([ item ]);
            };

            service.remove = function(item) {
                _.isArray(item) ? remove(item) : remove([ item ]);
            };

            return service;

        }]);

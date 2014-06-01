module.exports = function(config) {
    config.set({

        basePath : '../..',

        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-bootstrap/ui-bootstrap.js',

            'bower_components/lodash/dist/lodash.js',
            'bower_components/restangular/dist/restangular.js',
            'bower_components/angular-notify-toaster/toaster.js',

            'src/**/*.js',
            'test/unit/**/*.spec.js',
            'dist/templates/**/*.js'
        ],

        frameworks: ['jasmine'],
        reporters: ['progress', 'junit', 'coverage'],
        browsers: ['Firefox'],

        plugins: [
            'karma-firefox-launcher',
            'karma-junit-reporter',
            'karma-jasmine',
            'karma-coverage'
        ],

        preprocessors: {
            'src/**/*.js': 'coverage'
        },

        junitReporter: {
            outputFile: 'reports/unit.xml',
            suite: 'unit'
        },

        coverageReporter: {
            type: 'lcov',
            dir: 'reports/coverage'
        }
    })
};
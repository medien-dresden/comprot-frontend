module.exports = function(config) {
    config.set({

        basePath : '../..',

        files: [
            'bower_components/angular/angular.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-bootstrap/ui-bootstrap.js',

            'src/**/*.js',
            'test/unit/**/*.spec.js',
            'dist/templates/**/*.js'
        ],

        frameworks: ['jasmine'],
        reporters: ['progress', 'junit', 'coverage'],
        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
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
            reporters: [
                { type: 'html', dir:'reports/coverage-html' },
                { type: 'cobertura', dir:'reports/coverage-cobertura' }
            ]
        }
    })
};
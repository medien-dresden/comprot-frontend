module.exports = function(config) {
    config.set({

        basePath : '../..',

        files : [
            'vendor/angular/angular.js',
            'vendor/angular-route/angular-route.js',
            'vendor/angular-mocks/angular-mocks.js',
            'vendor/angular-resource/angular-resource.js',
            'vendor/angular-bootstrap/ui-bootstrap.js',

            'src/**/*.js',
            'test/unit/**/*.spec.js',
            'dist/templates/**/*.js'
        ],

        frameworks: ['jasmine'],
        reporters: ['progress', 'junit'],
        browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter : {
            outputFile: 'unit.report.xml',
            suite: 'unit'
        }
    })
};
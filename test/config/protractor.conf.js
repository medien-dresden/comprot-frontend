exports.config = {
    allScriptsTimeout: 11000,

    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: 'http://localhost:8000/dist/',

    framework: 'jasmine',

    specs: [
        '../../test/e2e/**/*.scenario.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};

exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        '../../test/integration/**/*.scenario.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:8000/dist/',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};

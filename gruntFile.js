module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-rename');

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-karma-coveralls');

    // Default task.
    grunt.registerTask('default', ['jshint','build','karma:unit']);
    grunt.registerTask('iterative-build', ['html2js','concat','less:build','copy']);
    grunt.registerTask('build-code', ['jshint','html2js','concat','copy']);
    grunt.registerTask('build', ['clean','iterative-build']);
    grunt.registerTask('release', ['clean','html2js','uglify','jshint','karma:unit','concat:index', 'less:min','copy','protractor']);
    grunt.registerTask('jar', ['compress:jar', 'rename:jar']);

    // Print a timestamp (useful for when watching)
    grunt.registerTask('timestamp', function() {
        grunt.log.subhead(Date());
    });

    var karmaConfig = function(configFile, customOptions) {
        var options = { configFile: configFile, keepalive: true };
        var travisOptions = process.env.TRAVIS && {};
        return grunt.util._.extend(options, customOptions, travisOptions);
    };

    var protractorConfig = function(configFile, customOptions) {
        var options = { configFile: configFile, keepAlive: false };
        var travisOptions = process.env.TRAVIS && {};
        return grunt.util._.extend(options, customOptions, travisOptions);
    };

    // Project configuration.
    grunt.initConfig({
        distdir: 'dist',
        pkg: grunt.file.readJSON('package.json'),
        banner:
            '/*! \n' +
            ' * <%= pkg.title %> v<%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>) \n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed under the <%= pkg.license %>\n' +
            ' */\n',

        src: {
            js: ['src/**/*.js'],
            jsTpl: ['<%= distdir %>/templates/**/*.js'],
            specs: ['test/**/*.spec.js'],
            scenarios: ['test/**/*.scenario.js'],
            html: ['src/index.html'],
            
            tpl: {
                app: ['src/app/**/*.tpl.html'],
                common: ['src/common/**/*.tpl.html']
            },

            lessWatch: ['src/less/**/*.less']
        },

        clean: ['<%= distdir %>/*'],

        copy: {
            assets: {
                files: [{
                    src : '**',
                    expand: true,
                    cwd: 'src/assets/',
                    dest: '<%= distdir %>/static'
                }]
            },

            bootstrapFonts: {
                files: [{
                    src : '**',
                    expand: true,
                    cwd: 'bower_components/bootstrap/fonts/',
                    dest: '<%= distdir %>/static/fonts'
                }]
            }
        },

        compress: {
            jar: {
                options: { archive: 'app.zip' },
                files: [{ expand: true, cwd: '<%= distdir %>', src: ['**/*'], dest: 'static' }]
            }
        },

        rename: {
            jar: {
                files: [{ src: ['app.zip'], dest: '<%= pkg.name %>-<%= pkg.version %>.jar' }]
            }
        },

        karma: {
            unit: { options: karmaConfig('test/config/karma.conf.js', { singleRun:true, autoWatch: false }) },
            watch: { options: karmaConfig('test/config/karma.conf.js', { singleRun:false, autoWatch: true }) }
        },

        protractor: {
            e2e: { options : protractorConfig('test/config/protractor.conf.js') }
        },

        coveralls: {
            options: {
                coverage_dir: 'reports/coverage',
                recursive: true,
                force: true
            }
        },

        html2js: {
            app: {
                options: { base: 'src/app' },
                src: ['<%= src.tpl.app %>'],
                dest: '<%= distdir %>/templates/app.js',
                module: 'templates.app'
            },

            common: {
                options: { base: 'src/common' },
                src: ['<%= src.tpl.common %>'],
                dest: '<%= distdir %>/templates/common.js',
                module: 'templates.common'
            }
        },

        concat:{
            dist:{
                options: { banner: "<%= banner %>" },
                src:['<%= src.js %>', '<%= src.jsTpl %>'],
                dest:'<%= distdir %>/static/application.js'
            },

            index: {
                src: ['src/index.html'],
                dest: '<%= distdir %>/index.html',
                options: { process: true }
            },

            angular: {
                src:[
                    'bower_components/angular/angular.js',
                    'bower_components/angular-route/angular-route.js',
                    'bower_components/angular-resource/angular-resource.js',
                    'bower_components/angular-animate/angular-animate.js'
                ],

                dest: '<%= distdir %>/static/angular.js'
            },

            thirdparty: {
                src: [
                    'bower_components/lodash/dist/lodash.js',
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap/dist/js/bootstrap.js',
                    'bower_components/restangular/dist/restangular.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                    'bower_components/angular-notify-toaster/toaster.js'
                ],

                dest: '<%= distdir %>/static/thirdparty.js'
            }
        },

        uglify: {
            dist:{
                options: { banner: "<%= banner %>" },
                src: ['<%= src.js %>' ,'<%= src.jsTpl %>'],
                dest: '<%= distdir %>/static/application.js'
            },

            angular: {
                src: ['<%= concat.angular.src %>'],
                dest: '<%= distdir %>/static/angular.js'
            },

            thirdparty: {
                src: ['<%= concat.thirdparty.src %>'],
                dest: '<%= distdir %>/static/thirdparty.js'
            }
        },

        less: {
            build: {
                options: { paths: ['src/less'] },
                files: { "<%= distdir %>/static/application.css": ['src/less/stylesheet.less'] }
            },

            min: {
                options: {
                    paths: ['src/less'],
                    compress: true
                },

                files: { "<%= distdir %>/static/application.css": ['src/less/stylesheet.less'] }
            }
        },

        watch:{
            all: {
                files:['<%= src.js %>', '<%= src.specs %>', '<%= src.lessWatch %>', '<%= src.tpl.app %>', '<%= src.tpl.common %>', '<%= src.html %>'],
                tasks:['default','timestamp']
            },

            build: {
                files:['<%= src.js %>', '<%= src.specs %>', '<%= src.lessWatch %>', '<%= src.tpl.app %>', '<%= src.tpl.common %>', '<%= src.html %>'],
                tasks:['iterative-build','timestamp']
            },

            code: {
                files:['<%= src.js %>', '<%= src.specs %>', '<%= src.tpl.app %>', '<%= src.tpl.common %>', '<%= src.html %>'],
                tasks:['build-code','timestamp']
            }
        },

        jshint:{
            files:['gruntFile.js', '<%= src.js %>', '<%= src.jsTpl %>', '<%= src.specs %>', '<%= src.scenarios %>'],
            options:{
                curly:true,
                eqeqeq:true,
                immed:true,
                latedef:true,
                newcap:true,
                noarg:true,
                sub:true,
                boss:true,
                eqnull:true,
                globals:{}
            }
        }
    });
};

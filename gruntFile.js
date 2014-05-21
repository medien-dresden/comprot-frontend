module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-protractor-runner');

    // Default task.
    grunt.registerTask('default', ['jshint','build','karma:unit']);
    grunt.registerTask('build', ['clean','html2js','concat','less:build','copy:assets']);
    grunt.registerTask('release', ['clean','html2js','uglify','jshint','karma:unit','protractor:e2e','concat:index', 'less:min','copy:assets']);
    grunt.registerTask('watch', ['karma:watch']);

    // Print a timestamp (useful for when watching)
    grunt.registerTask('timestamp', function() {
        grunt.log.subhead(Date());
    });

    var karmaConfig = function(configFile, customOptions) {
        var options = { configFile: configFile, keepalive: true };
        var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: 'dots' };
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
                    dest: '<%= distdir %>'
                }]
            }
        },

        karma: {
            unit: { options: karmaConfig('test/config/karma.conf.js', { singleRun:true, autoWatch: false }) },
            watch: { options: karmaConfig('test/config/karma.conf.js', { singleRun:false, autoWatch: true }) }
        },

        protractor: {
            e2e: {
                options : {
                    configFile: 'test/config/protractor.conf.js'
                }
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
                    'bower_components/angular-bootstrap/ui-bootstrap.js'
                ],

                dest: '<%= distdir %>/static/angular.js'
            }
        },

        uglify: {
            dist:{
                options: { banner: "<%= banner %>" },
                src:['<%= src.js %>' ,'<%= src.jsTpl %>'],
                dest:'<%= distdir %>/static/application.js'
            },

            angular: {
                src:['<%= concat.angular.src %>'],
                dest: '<%= distdir %>/static/angular.js'
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
                tasks:['build','timestamp']
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

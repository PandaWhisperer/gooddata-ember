// Copyright (C) 2007-2013, GoodData(R) Corporation. All rights reserved.

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        gitInfo: '',

        licence: grunt.file.read('tools/licence.tmpl'),

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'src',
                    name: '<%= pkg.name %>',
                    out: 'dist/<%= pkg.name %>-tmp.js',
                    paths: {
                        'gooddata': '../bower_components/gooddata/gooddata',
                        'ember': '../bower_components/ember/ember'
                    },
                    wrap: {
                        startFile: ['src/_start.js', 'src/loader.js'],
                        endFile: 'src/_end.js'
                    },
                    include: ['gooddata-ember'],
                    exclude: ['gooddata', 'ember'],
                    deps: ['loader'],
                    optimize: 'none', // do not uglify
                    preserveLicenseComments: true
                }
            }
        },

        concat: {
            js: {
                options: {
                    separator: "\n\n",
                    banner: '<%= licence %>'
                },
                src:  'dist/<%= pkg.name %>-tmp.js',
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            build: {
                options: {
                    banner: '<%= licence %>',
                    mangle: {
                        except: ['window'] // because of _start.js uses it to bind on window
                    }
                },
                src:  'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },

        jshint: {
            all: ['Gruntfile.js', '*.js', 'src/*.js', 'test/*.js', '!src/_start.js', '!src/_end.js', '!src/loader.js']
        },

        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: ['pkg'], // for a proper banner in disted file
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json', 'bower.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                push: true,
                pushTo: 'origin'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bump');

    grunt.loadTasks('tools/tasks/');

    grunt.registerTask('default', ['dist']);

    grunt.registerTask('dist', [
        'getGitInfo',
        'jshint',
        'requirejs',
        'concat',
        'uglify',
        'clean'
    ]);

    grunt.registerTask('release', [
        'bump',
        'init-bower-repo',
        'dist',
        'release-bower-component'
    ]);

};

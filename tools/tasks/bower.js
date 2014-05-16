// Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.

module.exports = function(grunt) {

    grunt.registerTask('init-bower-repo', 'Initializes repository in ./dist', function() {
        var exec = require('child_process').exec,
            gitUri = grunt.file.readJSON('bower.json').repository.url,
            done = this.async();
        exec('mkdir -p dist && cd dist && rm -rf ./* && git init && '+
            'git remote add bower ' + gitUri + ' && '+
            'git pull bower master', function(err, stdout, stderr) {
            if(err) {
                grunt.fatal('could not init bower repository');
                grunt.log.errorlns(stderr);
            }
            grunt.log.writeln("Inited bower repository in ./dist");
            done();
        });
    });

    grunt.registerTask('release-bower-component', 'Tag, commit and push dist files to bower component repo.', function() {
        var exec = require('child_process').exec,
            async = require('async'),
            done = this.async(),
            version = grunt.config.get('pkg.version');

        var copyPackageDescriptionStep = function(callback) {
            exec('cp bower.json LICENSE.txt dist', function(err, stdout, stderr) {
                if(err) {
                    callback("Could not copy bower.json or LICENSE.txt to dist\n" + stderr);
                }
                grunt.log.writeln('Copied bower.json and LICENSE.txt to dist');
                callback(null);
            });
        };
        var commitBowerReleaseStep = function(callback) {
            var commitMsg = grunt.config.get('bump.options.commitMessage').replace("%VERSION%", version);

            exec('cd dist && git add . && git commit -m "' + commitMsg + '"', function(err, stdout, stderr) {
                if(err) {
                    callback("Could not commit\n" + stderr);
                }
                grunt.log.writeln('Commiting bower release ' + version);
                callback(null);
            });
        };
        var tagBowerReleaseStep = function(callback) {
            var tagName = grunt.config.get('bump.options.tagName').replace("%VERSION%", version);
            exec('cd dist && git tag "' + tagName + '"', function(err, stdout, stderr) {
                if(err) {
                    callback("Could not tag\n" + stderr);
                }
                grunt.log.writeln('Tagging bower release ' + version);
                callback(null);
            });
        };
        var pushBowerComponentStep = function(callback) {
            exec('cd dist && git push -u bower master && git push bower --tags', function(err, stdout, stderr) {
                if(err) {
                    callback("Could not push bower commit and tag\n" + stderr);
                }
                grunt.log.writeln('Pushed ' + version + ' commit and tag');
                callback(null);
            });
        };
        var cleanupDistStep = function(callback) {
            exec('cd dist && rm -rf .git', function(err, stdout, stderr) {
                if(err) {
                    callback("Could not remove dist/.git files\n" + stderr);
                }
                callback(null);
            });
        };

        async.series([
            copyPackageDescriptionStep,
            commitBowerReleaseStep,
            tagBowerReleaseStep,
            pushBowerComponentStep,
            cleanupDistStep
        ], function(err, results) {
            if(err) {
                grunt.fatal(err);
            }
            done();
        });
    });

};

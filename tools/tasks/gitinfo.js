// Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.

module.exports = function(grunt) {

    grunt.registerTask('getGitInfo', 'Get latest commit hash', function() {
        var done = this.async();

        var child = grunt.util.spawn({
            cmd: 'git',
            args: ['log', '-1', '--format="%h"']
        }, function callback(err, result, code) {
            grunt.config.set('gitInfo', result.stdout);
            done(!code);
        });

        child.stdout.pipe(process.stdout);
        child.stderr.pipe(process.stderr);
    });

};

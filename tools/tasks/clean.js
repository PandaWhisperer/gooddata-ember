// Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.

module.exports = function(grunt) {

    grunt.registerTask('clean', 'Clean dist', function() {
        grunt.file['delete']('dist/gooddata-ember-tmp.js');
    });

};


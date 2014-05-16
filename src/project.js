// Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.
define(['gooddata', 'ember', 'ember-data'], function(gooddata, Ember, DS) {

    var attr = DS.attr;

    Project = DS.Model.extend({
        title:   attr('string'),  // Project Title
        summary: attr('string'),  // Project summary
        roles:   attr('string'),  // User's role in the Project
        created: attr('date'),    // Date of project creation
        updated: attr('date'),    // Date of project update
        author:  attr('string')   // Project creator account
    });

    return Project;
});

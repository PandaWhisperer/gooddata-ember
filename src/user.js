// Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.
define(['gooddata', 'ember'], function(gooddata, Ember) {
    'use strict';

    /**
     * User class
     */
    User = App.Metadata.extend({
        type: 'accountSetting',

        projects: function() {
            var self = this;

            return this.getProjects().then(function(projects) {
                self.set('projects', projects);
                return projects;
            });
        }.property('links.projects'),

        /**
         * Retrieves all projects for the current user
         *
         * @method getProjects
         * @return {Ember.RSVP.Promise} Promise resolving to an array of projects
         */
        getProjects: function() {
            var uri = this.get('links.projects');

            return new Ember.RSVP.Promise(function(resolve, reject) {
                if (uri) {
                    gooddata.xhr.get(uri).then(function(result) {
                        if (result && result.projects) {
                            var projects = result.projects.map(function(entry) {
                                return App.Project.create(entry.project);
                            });
                            resolve(projects);
                        }
                    }, function(error) {
                        reject(error);
                    });
                } else {
                    throw "Error: could not find projects link";
                }
            });
        }
    });

    User.reopenClass({
        /**
         * Loads the currently logged in user
         *
         * @method currentUser
         * @return {Ember.RSVP.Promise} Promise resolving to the current user
         */
        currentUser: function() {
            return this.load('/gdc/account/profile/current');
        }
    });

    return User;

});

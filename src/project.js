// Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.
define(['gooddata', 'ember'], function(gooddata, Ember) {
    'use strict';

    /**
     * Project class
     */
    Project = App.Metadata.extend({
        type: 'project',

        id: function() {
            var uri = this.get('uri');

            if (uri) {
                var parts = uri.split('/');
                return parts[parts.length - 1];
            }
        }.property('uri'),

        metrics: function() {
            var self = this;

            return this.getMetrics().then(function(metrics) {
                self.set('metrics', metrics);
                return metrics;
            });
        }.property(),

        /**
         * Loads all metrics for the project.
         *
         * @method getMetrics
         *
         * @return {Ember.RSVP.Promise} Promise resolving to an array of metrics
         */
        getMetrics: function() {
            var md = this.get('links.metadata');

            return new Ember.RSVP.Promise(function(resolve, reject) {
                if (md) {
                    gooddata.xhr.get(md + '/query/metrics').then(function(result) {
                        if (result && result.query && result.query.entries) {
                            var metrics = result.query.entries.map(function(metric) {
                                return App.Metric.create({ meta: metric });
                            });
                            resolve(metrics);
                        }
                    }, function(error) {
                        reject(error);
                    });
                } else {
                    throw "Error: could not find metadata link";
                }
            });
        }
    });

    /*
     * Static methods for Project class
     */
    Project.reopenClass({
        /**
         * Overloads App.Metadata.load with support for project ids
         *
         * @param {String} uri_or_id A project uri or project id
         * @return {Ember.RSVP.Promise} Promise resolving to the requested project
         */
        load: function(uri_or_id) {
            var uri = uri_or_id;

            // check if we got a uri or an id
            if (uri && uri.indexOf('/') == -1) {
                uri = '/gdc/projects/' + uri;
            }

            return this._super(uri);
        }
    });

    return Project;

});

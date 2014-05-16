// Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.
define(['gooddata', 'ember'], function(gooddata, Ember) {

    /**
     * Metric class
     */
    App.Metric = App.Metadata.extend({
        type: 'metric',

        dashboards: function() {
            var nodes = this.get('usedBy.nodes');
            if (nodes) {
                return nodes.filterBy('category', 'projectDashboard');
            }
        }.property('usedBy')
    });

});

// Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.
define([
    'metadata',
    'user',
    'project',
    'metric'
], function(
    Metadata,
    User,
    Project,
    Metric
) {
    'use strict';

    /**
     * # GoodData Ember
     */
    return {
        Metadata: Metadata,
        User: User,
        Project: Project,
        Metric: Metric
    }
});

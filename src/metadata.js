// Copyright (C) 2007-2014, GoodData(R) Corporation. All rights reserved.
define(['gooddata', 'ember'], function(gooddata, Ember) {

    /**
     * Abstract base class for platform metadata
     */
    App.Metadata = Ember.Object.extend({
        type: Ember.required(),

        // Metadata classes store their uri in different properties depending on the type.
        // This provides us a generic way to retrieve the object's uri.
        uri: Ember.computed.any('meta.uri', 'meta.link', 'links.self'),

        author: function() {
            var self = this;

            return this.getAuthor().then(function(author) {
                self.set('author', author);
                return author;
            });
        }.property('meta.author'),

        usedBy: function() {
            var self = this;

            return this.getUsedBy().then(function(usedBy) {
                // figure out whether object is actually used
                // and cache result
                if (usedBy.nodes.length == 0) {
                    usedBy.isUsed = false;
                } else {
                    usedBy.isUsed = true;
                }
                self.set('usedBy', usedBy);

                return usedBy;
            });
        }.property('uri'),

        /**
         * Attempts to delete this metadata object
         *
         * @method delete
         * @return {Promise} The promise of the delete request
         */
        delete: function() {
            var uri = this.get('uri');
            return gooddata.xhr.ajax(uri, {type: 'DELETE'});
        },

        /**
         * Reloads the metadata object from the GoodData API.
         *
         * @method reload
         * @return {Ember.RSVP.Promise} Promise resolving to the reloaded object
         */
        reload: function() {
            var uri  = this.get('uri'),
                type = this.get('type'),
                self = this;

            return new Ember.RSVP.Promise(function(resolve, reject) {
                if (uri) {
                    gooddata.xhr.get(uri).then(function(response) {
                        if (response && response[type]) {
                            resolve(self.setProperties(response[type]));
                        }
                    }, function(error) {
                        reject(error);
                    });
                } else {
                    throw "Error: could not determine object uri";
                }
            });
        },

        getAuthor: function() {
            var uri = this.get('meta.author');

            return App.User.load(uri).then(function(author) {
                // platform only return first name and last name,
                // so we add the full name here ourselves
                author.fullName = author.get('firstName') + ' ' +
                                  author.get('lastName');

                return author;
            });
        },

        /**
         * Retrieves information on which other objects this object is used by.
         *
         * @method getUsedBy
         * @return {Ember.RSVP.Promise} Promise resolving to a Ember.Object 
         */
        getUsedBy: function() {
            var uri  = this.get('uri'),
                self = this;

            return new Ember.RSVP.Promise(function(resolve, reject) {
                if (uri) {
                    gooddata.xhr.get(uri.replace('/obj/', '/usedby/')).then(function(response) {
                        if (response && response.usedby) {
                            resolve(Ember.Object.create(response.usedby));
                        }
                    }, function(error) {
                        reject(error);
                    });
                } else {
                    throw "Error: could not determine object uri";
                }
            });
        }
    });

    /*
     * Static methods for metadata class
     */
    App.Metadata.reopenClass({
        /**
         * Create a metadata object by loading it from the given uri.
         *
         * @method load
         * @static
         *
         * @param {String} uri GoodData object URI
         * @return {Ember.RSVP.Promise} Promise resolving to new object
         */
        load: function(uri) {
            var metadata = this;

            // find out our type
            if (!this.type) {
                this.type = this.create().get('type');
            }

            // return a promise that will resolve to the requested platform object
            return new Ember.RSVP.Promise(function(resolve, reject) {
                if (metadata.type) {
                    gooddata.xhr.get(uri).then(function(response) {
                        if (response && response[metadata.type]) {
                           resolve(metadata.create(response[metadata.type]));
                        }
                    }, function(error) {
                        reject(error);
                    });
                } else {
                    throw "Error: could not determine type";
                }
            });
        }
    });

});

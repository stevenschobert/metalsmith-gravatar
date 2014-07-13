(function() {
  'use strict';

  var md5 = require('md5'),

      stringToHash = function stringToHash(string) {
        return md5.digest_s(string);
      },

      plugin = function plugin(emails) {
        return function(files, metalsmith, done) {
          var urls = {};

          Object.keys(emails || {}).forEach(function(key) {
            if (typeof key === 'string') {
              urls[key] = stringToHash(emails[key]);
            }
          });

          metalsmith.data.gravatar = urls;

          done();
        };
      };

  module.exports = plugin;
}());

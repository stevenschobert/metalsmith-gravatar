(function() {
  'use strict';

  var md5 = require('md5'),

      GRAVATAR_URL = 'www.gravatar.com/avatar',

      assembleUrl = function assembleUrl(protocol, hash) {
        return protocol + '://' + GRAVATAR_URL + '/' + hash;
      },

      gravatarForEmail = function gravatarForEmail(email) {
        return assembleUrl('http', md5.digest_s(email));
      },

      plugin = function plugin(emails) {
        return function(files, metalsmith, done) {
          var urls = {};

          Object.keys(emails || {}).forEach(function(key) {
            if (typeof key === 'string') {
              urls[key] = gravatarForEmail(emails[key]);
            }
          });

          metalsmith.data.gravatar = urls;

          done();
        };
      };

  module.exports = plugin;
}());

(function() {
  'use strict';

  var md5 = require('md5'),

      GRAVATAR_URL = 'www.gravatar.com/avatar',

      assembleUrl = function assembleUrl(protocol, hash) {
        return protocol + '://' + GRAVATAR_URL + '/' + hash;
      },

      gravatarForEmail = function gravatarForEmail(protocol, email) {
        return assembleUrl(protocol, md5.digest_s(email));
      },

      mutateStringsInObject = function mutateStringsInObject(obj, mutator) {
        var converted = {};

        Object.keys(obj).forEach(function(key) {
          var value = obj[key];

          if (typeof value === 'string') {
            converted[key] = mutator(value);
          } else if (typeof value === 'object' && !Array.isArray(value)) {
            converted[key] = mutateStringsInObject(value, mutator);
          } else {
            converted[key] = value;
          }
        });

        return converted;
      },

      plugin = function plugin(args) {
        var options = {
              protocol: 'http'
            },
            avatars = args || {};

        if (Object.keys(args || {}).indexOf('options') >= 0) {
          Object.keys(args.options).forEach(function(key) {
            options[key] = args.options[key];
          });
          avatars = args.avatars || {};
        }

        return function(files, metalsmith, done) {
          metalsmith.data.gravatar = mutateStringsInObject(avatars, function(email) {
            return gravatarForEmail(options.protocol, email);
          });
          done();
        };
      };

  module.exports = plugin;
}());

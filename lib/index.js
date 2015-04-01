(function() {
  'use strict';

  var md5 = require('md5'),
      qs = require('querystring'),

      GRAVATAR_URL = 'www.gravatar.com/avatar',

      assembleUrl = function assembleUrl(protocol, hash, querystring) {
        return protocol + '://' + GRAVATAR_URL + '/' + hash + (querystring ? "?" + querystring : '');
      },

      gravatarForEmail = function gravatarForEmail(protocol, email, querystring) {
        return assembleUrl(protocol, md5.digest_s(email), querystring);
      },

      mutateStringsInObject = function mutateStringsInObject(obj, mutator) {
        var converted = {};

        Object.keys(obj).forEach(function(key) {
          var value = obj[key];

          if (typeof value === 'string') {
            converted[key] = mutator(value);
          } else if (typeof value === 'object' && !Array.isArray(value)) {
            if (value.email) {
              if (value.querystring && typeof value.querystring === 'object') {
                value.querystring = qs.stringify(value.querystring);
              }
              converted[key] = mutator(value.email, value.querystring);
            } else {
              converted[key] = mutateStringsInObject(value, mutator);
            }

          } else {
            converted[key] = value;
          }
        });

        return converted;
      },

      plugin = function plugin(args) {
        var options = {
              protocol: 'http',
              querystring: ''
            },
            avatars = args || {};

        if (Object.keys(args || {}).indexOf('options') >= 0) {
          Object.keys(args.options).forEach(function(key) {
            options[key] = args.options[key];
          });
          avatars = args.avatars || {};
        }

        return function(files, metalsmith, done) {
          var metadata = metalsmith.metadata();

          if (options.querystring && typeof options.querystring === 'object') {
            options.querystring = qs.stringify(options.querystring);
          }

          metadata.gravatar = mutateStringsInObject(avatars, function(email, querystring) {
            return gravatarForEmail(options.protocol, email, querystring ? querystring : options.querystring);
          });

          done();
        };
      };

  module.exports = plugin;
}());

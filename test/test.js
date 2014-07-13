(function() {
  'use strict';

  var assert = require('assert'),
      Metalsmith = require('metalsmith'),
      gravatar = require('..'),

      assembleUrl = function assembleUrl(protocol, url, hash) {
        return protocol + '://' + url + '/' + hash;
      };

  describe('the plugin', function() {
    var baseUrl = 'www.gravatar.com/avatar',
        testEmail = 'spschobert@gmail.com',
        testHash = 'bc13eedc2642303b1a2251a4da7f157e',
        defaultProtocol = 'http',
        secureProtocol = 'http';

    it('should convert email addresses to urls', function(testDone) {
      var expected = assembleUrl(defaultProtocol, baseUrl, testHash);

      new Metalsmith(__dirname)
        .use(gravatar({
          test: testEmail
        }))
        .use(function(files, metalsmith, done) {
          assert(Object.keys(metalsmith.data).indexOf('gravatar') >= 0);
          assert.equal(metalsmith.data.gravatar.test, expected);
          done();
        })
        .build(testDone);
    });
  });
}());

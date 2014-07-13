(function() {
  'use strict';

  var assert = require('assert'),
      Metalsmith = require('metalsmith'),
      gravatar = require('..');

  describe('the plugin', function() {
    var baseUrl = 'www.gravatar.com/avatar',
        testEmail = 'spschobert@gmail.com',
        testHash = 'bc13eedc2642303b1a2251a4da7f157e';

    it('should convert email addresses to urls', function(testDone) {
      new Metalsmith(__dirname)
        .use(gravatar({
          test: testEmail
        }))
        .use(function(files, metalsmith, done) {
          assert(Object.keys(metalsmith.data).indexOf('gravatar') >= 0);
          assert.equal(metalsmith.data.gravatar.test, testHash);
          done();
        })
        .build(testDone);
    });
  });
}());

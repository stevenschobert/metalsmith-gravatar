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
        secureProtocol = 'https',
        expected = assembleUrl(defaultProtocol, baseUrl, testHash);

    it('should convert email addresses to urls', function(testDone) {
      new Metalsmith(__dirname)
        .use(gravatar({
          test: testEmail
        }))
        .use(function(files, metalsmith, done) {
          assert(Object.keys(metalsmith.metadata()).indexOf('gravatar') >= 0);
          assert.equal(metalsmith.metadata().gravatar.test, expected);
          done();
        })
        .build(testDone);
    });

    it('should support nesting objects', function(testDone) {
      new Metalsmith(__dirname)
        .use(gravatar({
          nested: {
            test: testEmail,
            someArray: []
          }
        }))
        .use(function(files, metalsmith, done) {
          assert.equal(metalsmith.metadata().gravatar.nested.test, expected);
          assert.deepEqual(metalsmith.metadata().gravatar.nested.someArray, []);
          done();
        })
        .build(testDone);
    });

    describe('with an options key', function() {
      it('should pull the avatars from the "avatars" key', function(testDone) {
        new Metalsmith(__dirname)
          .use(gravatar({
            options: {},
            avatars: {
              test: testEmail
            }
          }))
          .use(function(files, metalsmith, done) {
            assert.equal(metalsmith.metadata().gravatar.options, undefined);
            assert.equal(metalsmith.metadata().gravatar.emails, undefined);
            assert.equal(metalsmith.metadata().gravatar.test, expected);
            done();
          })
          .build(testDone);
      });
    });

    describe('the protocol option', function() {
      it('should control the protocol', function(testDone) {
        var expected = assembleUrl(secureProtocol, baseUrl, testHash);

        new Metalsmith(__dirname)
          .use(gravatar({
            options: {
              protocol: 'https'
            },
            avatars: {
              test: testEmail
            }
          }))
          .use(function(files, metalsmith, done) {
            assert.equal(metalsmith.metadata().gravatar.test, expected);
            done();
          })
          .build(testDone);
      });
    });
  });
}());

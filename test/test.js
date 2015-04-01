(function() {
  'use strict';

  var assert = require('assert'),
      Metalsmith = require('metalsmith'),
      gravatar = require('..'),

      assembleUrl = function assembleUrl(protocol, url, hash, querystring) {
        return protocol + '://' + url + '/' + hash + (querystring ? '?' + querystring : '');
      };

  describe('the plugin', function() {
    var baseUrl = 'www.gravatar.com/avatar',
        testEmail = 'spschobert@gmail.com',
        testHash = 'bc13eedc2642303b1a2251a4da7f157e',
        testEmail2 = 'azurelogic@gmail.com',
        testHash2 = '0792a86bd840e2f9e16997e15e6658ea',
        defaultProtocol = 'http',
        secureProtocol = 'https',
        testQuerystring = 's=200&r=pg',
        testQuerystring2 = 's=400&r=g',
        expected = assembleUrl(defaultProtocol, baseUrl, testHash),
        expectedWithQuerystring = assembleUrl(defaultProtocol, baseUrl, testHash, testQuerystring),
        expectedWithQuerystring2 = assembleUrl(defaultProtocol, baseUrl, testHash2, testQuerystring2);

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
      it('should append the query string when given a string', function(testDone) {
        new Metalsmith(__dirname)
          .use(gravatar({
            options: {
              querystring: 's=200&r=pg'
            },
            avatars: {
              test: testEmail
            }
          }))
          .use(function(files, metalsmith, done) {
            assert.equal(metalsmith.metadata().gravatar.options, undefined);
            assert.equal(metalsmith.metadata().gravatar.emails, undefined);
            assert.equal(metalsmith.metadata().gravatar.test, expectedWithQuerystring);
            done();
          })
          .build(testDone);
      });
      it('should construct the query string when given an object', function(testDone) {
        new Metalsmith(__dirname)
          .use(gravatar({
            options: {
              querystring: {
                s: 200,
                r: 'pg'
              }
            },
            avatars: {
              test: testEmail
            }
          }))
          .use(function(files, metalsmith, done) {
            assert.equal(metalsmith.metadata().gravatar.options, undefined);
            assert.equal(metalsmith.metadata().gravatar.emails, undefined);
            assert.equal(metalsmith.metadata().gravatar.test, expectedWithQuerystring);
            done();
          })
          .build(testDone);
      });
    });

    describe('with individual user configurations', function() {
      it('should convert a user object with email to url', function(testDone) {
        new Metalsmith(__dirname)
            .use(gravatar({
              test: {
                email: testEmail
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

      it('should convert a user object with email and query string to url with query string', function(testDone) {
        new Metalsmith(__dirname)
            .use(gravatar({
              test: {
                email: testEmail,
                querystring: testQuerystring
              }
            }))
            .use(function(files, metalsmith, done) {
              assert.equal(metalsmith.metadata().gravatar.options, undefined);
              assert.equal(metalsmith.metadata().gravatar.emails, undefined);
              assert.equal(metalsmith.metadata().gravatar.test, expectedWithQuerystring);
              done();
            })
            .build(testDone);
      });

      it('should convert a user object with email and query string object to url with query string', function(testDone) {
        new Metalsmith(__dirname)
            .use(gravatar({
              test: {
                email: testEmail,
                querystring: {
                  s: 200,
                  r: 'pg'
                }
              }
            }))
            .use(function(files, metalsmith, done) {
              assert.equal(metalsmith.metadata().gravatar.options, undefined);
              assert.equal(metalsmith.metadata().gravatar.emails, undefined);
              assert.equal(metalsmith.metadata().gravatar.test, expectedWithQuerystring);
              done();
            })
            .build(testDone);
      });

      it('should take individual query string settings over general ones', function(testDone) {
        new Metalsmith(__dirname)
            .use(gravatar({
              options: {
                querystring: {
                  s: 200,
                  r: 'pg'
                }
              },
              avatars: {
                test: testEmail,
                test2: {
                  email: testEmail2,
                  querystring: {
                    s: 400,
                    r: 'g'
                  }
                }
              }
            }))
            .use(function(files, metalsmith, done) {
              assert.equal(metalsmith.metadata().gravatar.options, undefined);
              assert.equal(metalsmith.metadata().gravatar.emails, undefined);
              assert.equal(metalsmith.metadata().gravatar.test, expectedWithQuerystring);
              assert.equal(metalsmith.metadata().gravatar.test2, expectedWithQuerystring2);
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

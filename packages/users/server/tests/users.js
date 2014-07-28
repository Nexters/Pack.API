'use strict';

var crypto = require('crypto');

/**
 * Create a random hex string of specific length and
 * @todo consider taking out to a common unit testing javascript helper
 * @return string
 */
function getRandomString(len) {
    if (!len)
        len = 16;

    return crypto.randomBytes(Math.ceil(len/2)).toString('hex');
}

/**
 * Module dependencies.
 */
var should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

/**
 * Globals
 */
var user1, user2;

/**
 * Test Suites
 */

describe('<Unit Test>', function() {
  describe('Model User:', function() {
    before(function(done) {
        user1 = {
            name: 'Full name',
            email: 'test' + getRandomString() + '@test.com',
            token: getRandomString(),
            password: 'password',
            provider: 'local'
        };

        user2 = {
            name: 'Full name',
            email: 'test' + getRandomString() + '@test.com',
            token: getRandomString(),
            password: 'password',
            provider: 'local'
        };

        done();
    });

    describe('Method Save', function() {

        it('should begin without the test user', function(done) {
            User.find({ email: user1.email }, function(err, users) {
                users.should.have.length(0);

                User.find({ email: user2.email }, function(err, users) {
                    users.should.have.length(0);
                    done();
                });

            });
        });


        it('should be able to save without problems', function(done) {

            var _user = new User(user1);
            _user.save(function(err) {
                should.not.exist(err);
                _user.remove();
                done();
            });

        });


        it('should confirm that password is hashed correctly', function(done) {

            var _user = new User(user1);

            _user.save(function(err) {
                should.not.exist(err);
                _user.hashed_password.should.not.have.length(0);
                _user.salt.should.not.have.length(0);
                _user.authenticate(user1.password).should.equal(true);
                _user.remove(function(err) {
                    done();
                });

            });
        });

        it('should be able to create user and save user for updates without problems', function(done) {

            var _user = new User(user1);
            _user.save(function(err) {
                should.not.exist(err);

                _user.name = 'Full name2';
                _user.save(function(err) {
                    should.not.exist(err);
                    _user.name.should.equal('Full name2');
                    _user.remove(function() {
                        done();
                    });
                });

            });

        });

        it('should fail to save an existing user with the same values', function(done) {
            var _user1 = new User(user1);
            _user1.save(function(){
                var _user2 = new User(user1);
                return _user2.save(function(err) {
                    should.exist(err);
                    _user1.remove(function() {
                        if (!err) {
                            _user2.remove(function() {
                                done();
                            });
                        }
                        done();
                    });
                });
            });

        });

    });

    after(function(done) {

        var _user1 = new User(user1);
        var _user2 = new User(user2);

        _user1.remove();
        _user2.remove();

        done();
    });
  });
});


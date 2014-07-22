'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
    crypto = require('crypto'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

var user;

function getRandomString(len) {
  if (!len)
      len = 16;

  return crypto.randomBytes(Math.ceil(len/2)).toString('hex');
}
function makeSalt(){
  return crypto.randomBytes(16).toString('base64')
}
describe('<Rotuing Test>', function() {
  var url = 'http://localhost:3001';
  var user_agent = 'User-Agent: Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/1A542a Safari/419.3';

  before(function(done){
    user = new User({
      name: 'Full name',
      email: 'test' + getRandomString() + '@test.com',
      username: getRandomString(),
      token: makeSalt(),
      password: 'password',
      provider: 'local'
    });
    user.save(function(err) {
      should.not.exist(err);
      done();
    });
  });

  describe('Model User:', function() {
    it('respond to ping', function(done){
      request(url).get('/ping').expect(200,done);
    });

    it('routes user login', function(done){
      var data = {
        email: user.email,
        password: user.password
      };
      request(url)
        .post('/login')
        .set('User-Agent', user_agent)
        .send(data)
        .end(function(err, res){
          if(err){
            throw err;
          }
          should.not.exist(err);
          res.should.have.status(200);
          //res.body.should.have.property('msg');
          done();
      });
    });

    it('route user register', function(done){
      var data = {
        email: 'test' + getRandomString() + '@test.com',
        password: 'abcd1234',
        confirmPassword: 'abcd1234'
      };
      request(url)
        .post('/register')
        .set('User-Agent', user_agent)
        .send(data)
        .end(function(err, res){
          if(err){
            throw err;
          }
          should.not.exist(err);
          res.should.have.status(200);
          //res.body.should.have.property('msg');
          done();
      });
    });

    it('upload test', function(done){
      var file1Path = __dirname + '/test_files/test.png';
      console.log('file1Path : ' + file1Path);
      request(url)
        .post('/upload')
        .attach('file1', file1Path)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.should.have.status(200);
          done();
        });
    });
  });
  after(function(done) {
    user.remove();
    done();
  });
});

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
function removeUser(email){
  User
    .findOne({
        email: email
    })
    .exec(function(err, user) {
        user.remove();
    });
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
      var file1Path = __dirname + '/test_files/test.png';
      var data = {
        email: 'test' + getRandomString() + '@test.com',
        password: 'abcd1234',
        confirmPassword: 'abcd1234'
      };
      request(url)
        .post('/register')
        .set('User-Agent', user_agent)
        //.send(data)
        .field('email', data.email)
        .field('password', data.password)
        .field('confirmPassword', data.confirmPassword)
        .attach('image', file1Path)
        .end(function(err, res){
          if(err){
            throw err;
          }
          should.not.exist(err);
          var r = eval("("+res.text+")");
          r.should.have.property('status','0');
          // 이미지가 있어야함!
          r.data.should.have.property('image');
          removeUser(data.email);
          res.should.have.status(200);
          done();
      });
    });

    it('route user register by kakao', function(done){
      var file1Path = __dirname + '/test_files/test.png';
      var data = {
        email: 'test' + getRandomString() + '@test.com',
        password: 'abcd1234',
        confirmPassword: 'abcd1234',
        kakao: {
          properties: {
            "profile_image" : "http://mud-kage.kakao.co.kr/14/dn/btqbqQ6UjAO/PcZD4vxiEdfUrVxE6bBQVK/o.jpg",
            "thumbnail_image" : "http://mud-kage.kakao.co.kr/14/dn/btqbqUhacZG/kkZ3ONvwPjJuJ7qVKdkCG1/o.jpg",
            "nickname" : "김재영"
          },
          id: 1233160
        }
      };
      request(url)
        .post('/register')
        .set('User-Agent', user_agent)
        .field('email', data.email)
        .field('password', data.password)
        .field('confirmPassword', data.confirmPassword)
        .field('kakao.id',data.kakao.id)
        .end(function(err, res){
          if(err){
            throw err;
          }
          should.not.exist(err);
          var r = eval("("+res.text+")");
          r.should.have.property('status','0');
          // 카카오 정보로 가입함
          //r.data.should.have.property('kakao');
          res.should.have.status(200);
          //removeUser(data.email);
          done();
      });
    });
  });
  after(function(done) {
    user.remove();
    done();
  });
});

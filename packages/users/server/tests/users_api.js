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
        if(user !== null){
          user.remove();
        }
    });
}
function removeUserByKakao(kakao_id){
    User
    .findOne({
        'kakao.id': kakao_id
    })
    .exec(function(err, user) {
        if(user !== null){
          user.remove();
        }
    });
}

describe('<Rotuing Test>', function() {
  var url = 'http://localhost:3001';
  var user_agent = 'User-Agent: Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/1A542a Safari/419.3';

  before(function(done){
    user = new User({
      token: makeSalt(),
      provider: 'kakao',
      kakao: {
        properties: {
          profile_image: "http://mud-kage.kakao.co.kr/14/dn/btqbqQ6UjAO/PcZD4vxiEdfUrVxE6bBQVK/o.jpg",
          thumbnail_image: "http://mud-kage.kakao.co.kr/14/dn/btqbqUhacZG/kkZ3ONvwPjJuJ7qVKdkCG1/o.jpg",
          nickname: "김재영"
        },
        id: '100000'
      }
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

    it('route user register only kakao info', function(done){
      var data = {
        kakao: {
          properties: {
            "profile_image" : "http://mud-kage.kakao.co.kr/14/dn/btqbqQ6UjAO/PcZD4vxiEdfUrVxE6bBQVK/o.jpg",
            "thumbnail_image" : "http://mud-kage.kakao.co.kr/14/dn/btqbqUhacZG/kkZ3ONvwPjJuJ7qVKdkCG1/o.jpg",
            "nickname" : "김재영"
          },
          id: '100001'
        }
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
          var r = eval("("+res.text+")");
          r.should.have.property('status','0');
          // 이미지가 있어야함!
          r.data.should.have.not.property('image');
          // 카카오 정보로 가입함
          r.data.should.have.property('kakao');
          removeUserByKakao(data.kakao.id);
          res.should.have.status(200);
          done();
      });
    });

    it('route user register using kakao and image', function(done){
      var file1Path = __dirname + '/test_files/test.png';
      var data = {
        kakao: {
          properties: {
            "profile_image" : "http://mud-kage.kakao.co.kr/14/dn/btqbqQ6UjAO/PcZD4vxiEdfUrVxE6bBQVK/o.jpg",
            "thumbnail_image" : "http://mud-kage.kakao.co.kr/14/dn/btqbqUhacZG/kkZ3ONvwPjJuJ7qVKdkCG1/o.jpg",
            "nickname" : "김재영"
          },
          id: '100002'
        }
      };
      request(url)
        .post('/register')
        .set('User-Agent', user_agent)
        .field('kakao',require('qs').stringify(data.kakao))
        .attach('image', file1Path)
        .end(function(err, res){
          if(err){
            throw err;
          }
          should.not.exist(err);
          var r = eval("("+res.text+")");
          r.should.have.property('status','0');
          // 카카오 정보로 가입함
          r.data.should.have.property('kakao');
          res.should.have.status(200);
          removeUserByKakao(data.kakao.id);
          done();
      });
    });
    it('route user register if a user already exists', function(done){
      var file1Path = __dirname + '/test_files/test.png';
      var data = {
        kakao: {
          properties: {
            "profile_image" : "http://mud-kage.kakao.co.kr/14/dn/btqbqQ6UjAO/PcZD4vxiEdfUrVxE6bBQVK/o.jpg",
            "thumbnail_image" : "http://mud-kage.kakao.co.kr/14/dn/btqbqUhacZG/kkZ3ONvwPjJuJ7qVKdkCG1/o.jpg",
            "nickname" : "김재영_새로가입"
          },
          id: user.kakao.id
        }
      };
      request(url)
        .post('/register')
        .set('User-Agent', user_agent)
        .field('kakao',require('qs').stringify(data.kakao))
        .attach('image', file1Path)
        .end(function(err, res){
          if(err){
            throw err;
          }
          should.not.exist(err);
          var r = eval("("+res.text+")");
          r.should.have.property('status','0');
          // 카카오 정보로 가입함
          r.data.should.have.property('kakao');
          r.data.kakao.properties.should.have.property('nickname',user.kakao.properties.nickname)
          res.should.have.status(200);

          done();
      });
    });
    it('route check token', function(done){
      // 토큰이 있는지 조사
      var data = {
        channel: 'local',
        token: user.token
      };
      request(url)
        .post('/check')
        .set('User-Agent', user_agent)
        .send(data)
        .end(function(err, res){
          if(err){
            throw err;
          }
          should.not.exist(err);
          var r = eval("("+res.text+")");
          r.should.have.property('status','0');
          // 카카오 아이디가 요청한값이랑 같아야함
          r.data.should.have.property('token',data.token);
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

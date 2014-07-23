'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = mongoose.model('User'),
    Station = mongoose.model('Station');

var station, user;

describe('<Rotuing Test>', function() {
  var url = 'http://localhost:3001';
  var user_agent = 'User-Agent: Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/1A542a Safari/419.3';
  before(function(done) {
      station = new Station({
        name: '테스트 역',
        type: 'Airport',
        loc: [35.549393, 139.779839],
        address: '3-3-2 Hanedakuko, Ota, Tokyo 144-0041 일본 222',
        hidden: false
      });
      station.save(function(err) {
        should.not.exist(err);
        User.findOne().exec(function(err, _user) {
          user = _user;
          done();
        });
      });
  });

  describe('Model Station:', function() {
    // 주변에 역에 대한 정보를 가져온다.
    it('get nearest station', function(done){
      var data = {
        lat: '35.5465',
        lng: '139.7776825'
      };
      request(url)
        .get('/stations/near')
        .set('User-Agent', user_agent)
        .query(data)
        .end(function(err, res){
          if(err){
            throw err;
          }
          should.not.exist(err);
          var r = eval("("+res.text+")");
          r.should.have.property('status','0');
          res.should.have.status(200);
          done();
        });
    });
    // 댓글을 생성한다. 인증필요!
    it('create comment', function(done){
      var data = {
        body: "Body",
        user: user
      };

      request(url)
        .post('/stations/'+station._id+'/create')
        .set('User-Agent', user_agent)
        .set('x-pack-email',user.email)
        .set('x-pack-token',user.token)
        .send(data)
        .end(function(err, res){
          if(err){
            throw err;
          }
          should.not.exist(err);
          var r = eval('('+res.text+')');
          // 상태코드 0 이여야 한다.
          r.should.have.property('status','0');
          // 댓글이 생성되고 내용은 입력한 내용 그대로여야 한다.
          r.data.comments[0].should.have.property('body',data.body);

          //r.data.comments[0].user.should.have.property('_id',String(user._id));
          // 댓글을 생성한 유저가 data 로입력한 유저와 같아야 한다.
          r.data.comments[0].user.should.have.properties({
            _id: String(user._id),
            email: user.email,
            token: user.token
          });

          // http code 는 200
          res.should.have.status(200);
          done();
        });
    });
    // 댓글이 성공적으로 생성되야 통과할수 있는 테스트 이다.
    it('list comments', function(done){
      request(url)
        .get('/stations/'+station._id+'/comments')
        .set('User-Agent', user_agent)
        .end(function(err, res){
          if(err){
            throw err;
          }
          should.not.exist(err);
          var r = eval('('+res.text+')');
          console.log(r);
          // 상태코드 0 이여야 한다.
          r.should.have.property('status','0');
          // data 는 comments 에 대한 array
          r.data.should.be.an.Array;
          // data 에 element 는 body 키를 가지고 있다.
          r.data[0].should.have.enumerable('body');
          // http code 는 200
          res.should.have.status(200);

          done();
        });
    });
  });

  after(function(done) {
    station.remove();
    done();
  });
});

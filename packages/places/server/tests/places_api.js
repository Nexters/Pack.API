"use strict";
/**
  * Module dependencies.
  */
var should = require('should'),
    expect = require('chai').expect,
    request = require('supertest'),
    mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Place = mongoose.model('Place'),
    Station = mongoose.model('Station');

var new_place;

describe('<Routing Test>', function () {
  var url = 'http://localhost:3001';
  var user_agent = 'User-Agent: Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/1A542a Safari/419.3';
  var station = new Station({
        name: '테스트 역3',
        type: 'Airport',
        loc: [35.549393, 139.779839],
        address: '3-3-2 Hanedakuko, Ota, Tokyo 144-0041 일본 222',
        hidden: true
    });
  before(function(done) {
    new_place = new Place({
      name: '에펠탑 test',
      type: 'Sightseeing',
      loc: [48.8583, 2.2945],
      near_station: station._id,
      content: "에펠 탑(프랑스어: Tour Eiffel, [tuʁ ɛfɛl])은 1889년 파리 마르스 광장에 지어진 탑이다. "
    });
    new_place.save(function(err) {
      should.not.exist(err);
      done();
    });
  });

  describe('Place : ', function() {
    it('id를 가지고 해당 Place정보를 가져온다.', function(done) {
      request(url)
        .get('/places/'+new_place._id)
        .set('User-Agent', user_agent)
        .end(function(err, res){
          if(err){
            throw err;
          }
          should.not.exist(err);

          var r = eval('('+res.text+')');
          // 상태코드 0 이여야 한다.
          r.should.have.property('status','0');
          // http code 는 200
          res.should.have.status(200);

          done();
        });
    });

    it('새로운 정보를 update하고 저장한 결과가 동일해야 한다.', function(done) {
      var data = {
        name: '에펠탑 test2',
        type: 'Sightseeing',
        loc: [48.8583, 2.2945],
        near_station: station._id,
        content: "에펠 탑(프랑스어: Tour Eiffel, [tuʁ ɛfɛl])은 1889년 파리 마르스 광장에 지어진 탑이다. "
      };

      request(url)
        .put('/places/'+new_place._id)
        .set('User-Agent', user_agent)
        .send(data)
        .end(function(err, res) {
          if(err){
            throw err;
          }
          should.not.exist(err);
          var r = eval('('+res.text+')');
          // 상태코드 0 이여야 한다.
          r.should.have.property('status','0');
          // 댓글이 생성되고 내용은 입력한 내용 그대로여야 한다.
          r.data.should.have.property('name',data.name);
          // http code 는 200
          res.should.have.status(200);
          done();
        });
    });
  });

  after(function(done) {
    new_place.remove();
    done();
  });
});

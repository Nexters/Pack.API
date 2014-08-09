'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
    expect = require('chai').expect,
    request = require('supertest'),
    mongoose = require('mongoose'),
    async = require('async'),
    Guesthouse = mongoose.model('Guesthouse'),
    Station = mongoose.model('Station');


var new_guesthouse;
var station;
/**
describe('<Rotuing Test>', function() {
  var url = 'http://localhost:3001';
  var user_agent = 'User-Agent: Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/1A542a Safari/419.3';

  beforeEach(function(done) {
      new_guesthouse = new Guesthouse({
        name: '제주 부엉이집 펜션 테스트2',
        city: '제주도',
        loc: [33.399776, 126.250407],
        info: '총 수용인원 24명 / 무선인터넷 / [제주시서부/협재] 협재해수욕장 차량 5분! 공항에서 차량 1시간, 제주 시외버스터미널에서 차량 1시간, 제주항에서 차량 1시간 15분',
        address: '제주도 제주시 한림읍 협재리 1376',
        near_stations: new Station({
          name: '펜션 근처 공항',
          type: 'Airport',
          loc: [33,51111, 126.49278],
          address: ' 대한민국 제주특별자치도 제주시 용담2동',
          hidden: false
        }),
        price : 140000
      });
      new_guesthouse.save(function(err) {
        should.not.exist(err);
        done();
      });
  });

  describe('Model Guesthouse:', function() {

    it('id에 맞는 게스트하우스 정보를 가져온다.', function(done){
      request(url)
        .get('/guesthouses/'+new_guesthouse._id)
        .set('User-Agent', user_agent)
        .end(function(err, res){
          if(err){
            console.log(err+' '+new_guesthouse._id+'정보가져오기');
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

    // 주변에 역에 대한 정보를 가져온다.
    it('get nearest guesthouses2222', function(done){
      var data = {
        lat: '35.5465',
        lng: '139.7776825'
      };
      request(url)
        .post('/guesthouses/near')
        .set('User-Agent', user_agent)
        .send(data)
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
      //done();
    });
  });

  afterEach(function(done) {
    new_guesthouse.remove();
    done();
  });
});
*/

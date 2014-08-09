'use strict';
// Module dependencies.
var should = require('should'),
    mongoose = require('mongoose'),
    Guesthouse = mongoose.model('Guesthouse'),
    Station = mongoose.model('Station');

var new_guesthouse;
/**
describe('Model test', function (){
  beforeEach(function(done) {
    new_guesthouse = new Guesthouse({
      name: '제주 부엉이집 펜션 테스트',
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
    done();
  });
  describe(':GUESTHOUSE ', function() {
    it('새로운 게스트하우스 정보를 저장한다.', function(done){
      new_guesthouse.save(function(err) {
        should.not.exist(err);
        done();
      });
    });
  });
  afterEach(function(done) {
    new_guesthouse.remove();
    done();
  });
});
*/

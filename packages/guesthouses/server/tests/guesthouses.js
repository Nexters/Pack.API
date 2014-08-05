'use strict';
// Module dependencies.
var should = require('should'),
    mongoose = require('mongoose'),
    Guesthouse = mongoose.model('Guesthouse'),
    Station = mongoose.model('Station');

var new_guesthouse;
/*
describe('Model test', function (){
  beforeEach(function(done) {
    new_place = new Place({
      name: '에펠탑 test',
      type: 'sightseeing',
      loc: [48.8583, 2.2945],
      near_station: new Station({
        name: '테스트 역',
        type: 'Airport',
        loc: [35.549393, 139.779839],
        address: '3-3-2 Hanedakuko, Ota, Tokyo 144-0041 일본 222',
        hidden: false
      }),
      content: "에펠 탑(프랑스어: Tour Eiffel, [tuʁ ɛfɛl])은 1889년 파리 마르스 광장에 지어진 탑이다. 프랑스의 대표 건축물인 이 탑은 격자 구조로 이루어져 있다. 파리에서 가장 높은 건축물이며, 매년 수백만 명이 방문할 만큼 세계적인 유료 관람지이다. 이를 디자인한 귀스타브 에펠의 이름에서 명칭을 얻었으며, 1889년 프랑스 혁명 100주년 기념 세계 박람회의 출입 관문으로 건축되었다."
    });
    done();
  });
  describe(':Place ', function() {
    it('새로운 place 정보를 저장한다.', function(done){
      new_place.save(function(err) {
        should.not.exist(err);
        done();
      })
    });
  });
  afterEach(function(done) {
    new_place.remove();
    done();
  });
});
*/

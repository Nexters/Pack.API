'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    Station = mongoose.model('Station'),
    Guesthouse = mongoose.model('Guesthouse');

var station;

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
        done();
      });
  });

  describe('Model Guesthouse:', function() {
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

  after(function(done) {
    station.remove();
    done();
  });
});

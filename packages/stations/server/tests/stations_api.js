'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
    request = require('supertest');

describe('<Rotuing Test>', function() {
  var url = 'http://localhost:3001';
  var user_agent = 'User-Agent: Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/1A542a Safari/419.3';

  describe('Model Station:', function() {
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
          console.log(err);
          should.not.exist(err);
          res.should.have.status(200);
          done();
        });
    });
  });
});

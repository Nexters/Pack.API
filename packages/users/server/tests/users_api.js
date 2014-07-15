'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
    request = require('supertest');

describe('<Rotuing Test>', function() {
  var url = 'http://localhost:3000';
  var user_agent = 'User-Agent: Mozilla/5.0 (iPhone; U; CPU iPhone OS 3_0 like Mac OS X; en-us) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/1A542a Safari/419.3';
  describe('Model User:', function() {
    it('respond to ping', function(done){
      request(url).get('/ping').expect(200,done);
    });
    it('routes login', function(done){
      var data = {
        email: 'test@gmail.com',
        password: 'abcd1234'
      };
      request(url)
        .post('/login')
        .set('User-Agent', user_agent)
        .send(data)
        .end(function(err, res){
          if(err){
            throw err;
          }
          console.log(res.body);
          should.not.exist(err);
          res.should.have.status(200);
          //res.body.should.have.property('msg');
          done();
      });
    });
  });
});

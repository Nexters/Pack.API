'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    Station = mongoose.model('Station');

var station;

describe('<Rotuing Test>', function() {
  var url = 'http://localhost:3001';
  before(function(done) {
      station = {
        name: '도쿄국제공항',
        type: 'Airport',
        loc: { lat: 35.549393, lng: 139.779839},
        address: '3-3-2 Hanedakuko, Ota, Tokyo 144-0041 일본',
        hidden: false,
        comments: []
      };
      done();
  });
  describe('Model Station:', function() {
    it('Save station', function(done){
      var _station = new Station(station);
      _station.save(function(err) {
          should.not.exist(err);
          _station.remove();
          done();
      });
    });
  });
  after(function(done) {
      done();
  });
});

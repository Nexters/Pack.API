'use strict';
/**
 * Module dependencies.
 */
var should = require('should'),
    request = require('supertest'),
    mongoose = require('mongoose'),
    Station = mongoose.model('Station');

var station;

describe('<Model Test>', function() {
  before(function(done){
    done();
  });
  beforeEach(function(done) {
    station = new Station({
      name: '테스트 역',
      type: 'Airport',
      loc: [35.549393, 139.779839],
      address: '3-3-2 Hanedakuko, Ota, Tokyo 144-0041 일본 222',
      hidden: false
    });
    done();
  });
  describe('<Model Station:>', function() {
    it('Save station', function(done){
      station.save(function(err) {
        should.not.exist(err);
        done();
      });
    });
    it('should update to request arguments', function() {
      
    });
  });
  after(function(done){
    done();
  });
  afterEach(function(done) {
    station.remove();
    done();
  });
});

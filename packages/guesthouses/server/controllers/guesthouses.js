'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Guesthouse = mongoose.model('Guesthouse'),
    _ = require('lodash');

/**
 * Show an Guesthouse
 */
exports.show = function(req, res) {
  console.log('show~!');
  res.success(req.guesthouse || null);
};



exports.create = function(req, res, next) {
  var guesthouse = new Guesthouse(req.body);

  guesthouse.save(function(err) {
    if (err) {
      return res.fail('40001');
    }
    res.success(guesthouse);
  });
};

/**
 * List of Guesthouses
 */
exports.all = function(req, res) {
    Guesthouse.all(function(err, guesthouses) {
        if (err) {
            console.log(err);
            return res.fail('40002');
        }
        res.success(guesthouses);
    });
};

exports.near = function(req, res) {
  var q = Guesthouse.find({ 'loc': { $near: [ req.body.lat, req.body.lng] }});
  q.limit(10);
  q.exec(function(err, station){
    if(err){
      return res.fail('30003');
    }
    res.success(station);
  });
};

/*
 * Find guesthouse by id
 */
exports.guesthouse = function(req, res, next, id) {

  Guesthouse.load(id, function(err, guesthouse) {
      if (err){
        console.log('load error');
        return next(err);
      }
      if (!guesthouse) {
        return next(new Error(id+':Guesthouse 정보를 가져오는데 실패 했습니다.'));
      }
      console.log(guesthouse.name + '불러오기 성공!');

      req.guesthouse = guesthouse;
      next();
    });
};

// Updates guesthouse.
exports.update = function(req, res) {
  var guesthouse = req.guesthouse;

  guesthouse = _.extend(guesthouse, req.body);

  guesthouse.save(function(err) {
    if (err) {
      return res.fail('40001');
    }
    res.success(guesthouse);
  });
};

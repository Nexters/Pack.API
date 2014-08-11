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
 * Find gusethouse by id
 */
exports.gusethouse = function(req, res, next, id) {
  Guesthouse.load(id, function(err, guesthouse) {
      if (err) return next(err);
      if (!guesthouse) return next(new Error(id+':Guesthouse 정보를 가져오는데 실패 했습니다.'));
      req.guesthouse = guesthouse;
      next();
    });
};

// Updates gusethouse.
exports.update = function(req, res) {
  var gusethouse = req.gusethouse;

  gusethouse = _.extend(gusethouse, req.body);

  gusethouse.save(function(err) {
    if (err) {
      return res.fail('40001');
    }
    res.success(gusethouse);
  });
};

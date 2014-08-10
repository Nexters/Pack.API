'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Stamp = mongoose.model('StampStamp'),
    _ = require('lodash');

/**
 * Show an Stamp
 */
exports.show = function(req, res) {
  console.log('show~!');
  res.success(req.stamp || null);
};



exports.create = function(req, res, next) {
  var stamp = new Stamp(req.body);

  stamp.save(function(err) {
    if (err) {
      return res.fail('40001');
    }
    res.success(stamp);
  });
};

/**
 * List of Stamps
 */
exports.all = function(req, res) {
    Stamp.all(function(err, stamps) {
        if (err) {
            console.log(err);
            return res.fail('40002');
        }
        res.success(stamps);
    });
};

/*
 * Find stamp by id
 */
exports.stamp = function(req, res, next, id) {

  Stamp.load(id, function(err, stamp) {
      if (err){
        return next(err);
      }
      if (!stamp) {
        return next(new Error(id+':Stamp 정보를 가져오는데 실패 했습니다.'));
      }

      req.stamp = stamp;
      next();
    });
};

// Updates stamp.
exports.update = function(req, res) {
  var stamp = req.stamp;

  stamp = _.extend(stamp, req.body);

  stamp.save(function(err) {
    if (err) {
      return res.fail('40001');
    }
    res.success(stamp);
  });
};

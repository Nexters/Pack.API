'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Place = mongoose.model('Place'),
    _ = require('lodash');

exports.create = function(req, res, next) {
  var new_place = new Place(req.body);

  new_place.save(function(err) {
    if (err) {
      return res.fail('30001');
    }
    res.success(new_place);
  });
};

// List of Places
exports.all = function(req, res) {
  Place.find().sort('-created').exec(function(err, places) {
    if (err) {
      return res.fail('30002');
    }
    res.success(places);
  });
};

exports.place = function(res, req, next, id) {
  Place.load(id, function(err, place) {
    if (err) return next(err);
    if (!place) return next(new Error(id + ':Place 정보를 가져오는데 실패 했습니다.'));
    req.place = place;
    next();
  });
};

exports.show = function(req, res) {
  res.success(req.place || null);
};

// Update place
exports.update = function(req, res) {
  var place = req.place;

  place = _.extend(place, req.body);

  place.save(function(err) {
    if (err) {
      return res.fail('30001');
    }
    res.success(place);
  });
};
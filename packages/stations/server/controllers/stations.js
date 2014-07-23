'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Station = mongoose.model('Station');

/**
 * Show an Station
 */
exports.show = function(req, res) {
  res.success(req.station || null);
};

exports.near = function(req ,res) {
  console.log(req.query.lat);
  res.success('wow');
};

exports.create = function(req, res, next) {
  var station = new Station(req.body);

  station.save(function(err) {
    if (err) {
      return res.fail('20001');
    }
    res.success(station);
  });
};

/**
 * List of Users
 */
exports.all = function(req, res) {
    Station.find().sort('-created').populate('').exec(function(err, stations) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the stations'
            });
        }
        res.success(stations);
        //res.fail("0","error!!")
    });
};

/*
 * Find station by id
 */
exports.station = function(req, res, next, id) {
  Station
    .findOne({
        _id: id
    })
    .exec(function(err, station) {
        if (err) return next(err);
        if (!station) return next(new Error('Failed to load Station ' + id));
        req.station = station;
        next();
    });
};

// Updates station.
exports.update = function(req, res, next, id) {
  Station
    .findByIdAndUpdate(id, req.body, function(err) {
      if (err) return next(err);
    });
};

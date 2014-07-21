'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Station = mongoose.model('Station');

/**
 * Show an Near Station
 */
exports.near = function(req ,res) {
  var q = Station.findOne({ 'loc': { $near: [ req.query.lat, req.query.lng] }});
  q.exec(function(err, station){
    if(err){
      return res.fail('20002');
    }
    res.success(station);
  });
};

exports.comment_create = function(req ,res) {
  var station = req.station;
  station.comments.push(req.body);
  station.save(function(err){
    if (err) {
      return res.fail('20003');
    }
    res.success(station);
  });
};

exports.comments = function(req ,res) {
  var station = req.station;
  res.success(station.comments);
};
/**
 * Show an Station
 */
exports.show = function(req, res) {
  res.success(req.station || null);
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
 * Find Station by id
 */
exports.station = function(req, res, next, id) {
  Station
    .findOne({
        _id: id
    })
    .populate('comments.user')
    .exec(function(err, station) {
        if (err) return next(err);
        if (!station) return next(new Error('Failed to load Station ' + id));
        req.station = station;
        next();
    });
};

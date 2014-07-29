'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Station = mongoose.model('Station'),
    _ = require('lodash');

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
 * List of Stations
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
    .populate({path: 'comments.user'/*, options: { sort: { '_id': 1 } }*/}) // 반드시 ref 를 가져오려면 populate 를 해주어야 한다. (join 개념!)
    .exec(function(err, station) {
        if (err) return next(err);
        if (!station) return next(new Error('Failed to load Station ' + id));
        station.comments.sort(function(m1, m2){
          return m2.date - m1.date; // 시간순정렬
        });
        req.station = station;
        next();
    });
};

// Updates station.
exports.update = function(req, res) {
  var station = req.station;

  station = _.extend(station, req.body);

  station.save(function(err) {
    if (err) {
      return res.fail('20001');
    }
    res.success(station);
  });
};



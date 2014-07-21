#!/usr/bin/node

var mongoose = require('mongoose'),
  StationSchema = require('../packages/stations/server/models/station');

var Station = mongoose.model('Station', StationSchema);
var mean = require('meanio'),
  config = mean.loadConfig();


mongoose.connect(config['db']);

var fs = require('fs');
var lineList = fs.readFileSync(__dirname + '/data/data.csv').toString().split('\n');
var header = lineList.shift();
console.log(header.split(','));


var schemaKeyList = header.split(',');

function createDocRecurse (err) {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    if (lineList.length-1) {
        var line = lineList.shift();
        var doc;
        var key = line.split(',')[0];
        Station.findOne({
            name: key
        }, function(err,station){
          if(err){
            doc = new Station();
          }else{
            doc = station;
          }
          line.split(',').forEach(function (entry, i) {
            if(schemaKeyList[i] === 'loc'){
              entry = {
                lat: Number(entry.split('..')[0]),
                lng: Number(entry.split('..')[1])
              };
            }
            doc[schemaKeyList[i]] = entry;

          });
          console.log(doc.toJSON());
          doc.save(createDocRecurse);
        });

    } else {
        console.log('completed');
        process.exit(1);
    }
}

createDocRecurse(null);


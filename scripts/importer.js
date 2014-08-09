#!/usr/bin/node

var targetModel = process.argv[2];

var mongoose = require('mongoose'),
  ModelSchema = require('../packages/'+targetModel.toLowerCase()+'s/'+'server/models/'+ targetModel.toLowerCase());

var Model = mongoose.model(targetModel, ModelSchema);

var mean = require('meanio'),
  config = mean.loadConfig();

mongoose.connect(config['db']);

var fs = require('fs');
var lineList = fs.readFileSync(__dirname + '/data/'+targetModel.toLowerCase()+'.csv').toString().split('\n');
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
        Model.findOne({
            name: key
        }, function(err, model){
          if(err || model == null){
            doc = new Model();
          }else{
            doc = model;
          }
          line.split(',').forEach(function (entry, i) {
            if(schemaKeyList[i] === 'loc'){
              entry = [ Number(entry.split(':')[0]), Number(entry.split(':')[1]) ];
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


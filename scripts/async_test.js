var async = require('async'),
    util = require('util'),
    fs = require('fs');

async.each(['1','2','3'], function( file, callback) {

  // Perform operation on file here.
  console.log('Processing ' + file);
  callback();
}, function(err){
  // if any of the file processing produced an error, err would equal that error
  if( err ) {
    // One of the iterations produced an error.
    // All processing will now stop.
    console.log('each error');
  } else {
    console.log('each success');
  }
});

async.map(['test.js','user_import.js','file3'], fs.stat, function(err, results){
    // results is now an array of stats for each file
    console.log('map : ' + results);
    for(var t in results){
      console.log(t);
    }
});

async.filter(['test.js','user_import.js','file3'], fs.exists, function(results){
  // 존재하는 파일만
  console.log('filter : ' + results);
});

async.reduce([1,2,3], 0, function(memo, item, callback){
    // pointless async:
    process.nextTick(function(){
        callback(null, memo + item)
    });
}, function(err, result){
    console.log('reduce : ' + result);
});


async.detect(['test.js','user_import.js','file3'], fs.exists, function(result){
  // 하나라도 찾으면 멈춤
    console.log('detect : ' + result);
});

async.sortBy([1,9,3,5], function(x, callback){
    callback(null, x*-1);    //<- x*-1 instead of x, turns the order around
}, function(err,result){
    console.log('sortBy : ' + result);
});


async.some(['test.js','user_import.js','file3'], fs.exists, function(result){
  // 성공 실패결과알려줌
    console.log('some : ' + result);
});
async.parallel([
    function(callback){
        setTimeout(function(){
            callback(null, 'one');
        }, 200);
    },
    function(callback){
        setTimeout(function(){
            callback(null, 'two');
        }, 100);
    }
],
function(err, results){
    console.log('parallel : ' + util.inspect(results));
});

async.parallel({
    one: function(callback){
        setTimeout(function(){
            callback(null, 1);
        }, 200);
    },
    two: function(callback){
        setTimeout(function(){
            callback(null, 2);
        }, 100);
    }
},
function(err, results) {
    console.log('parallel2 : ' + util.inspect(results));
});

async.waterfall([
    function(callback){
        callback(null, 'one', 'two');
    },
    function(arg1, arg2, callback){
      // arg1 now equals 'one' and arg2 now equals 'two'
        callback(null, 'three');
    },
    function(arg1, callback){
        // arg1 now equals 'three'
        callback(null, 'done');
    }
], function (err, result) {
   console.log('waterfall : ' + util.inspect(result));
});


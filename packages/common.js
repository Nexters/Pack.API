'use strict';
exports.nothing = function(){

};
exports.success = function(res,req,data){
  var response = {
    status: '0',
    msg: 'no msg',
    data: data
  };

  if(req.get('Content-Type') === 'application/json'){
    res.jsonp(response);
  }else{
    res.jsonp(data);
  }
};

exports.error = function(res,req,errorCode,Msg){
  var response = {
      status: errorCode,
      msg: Msg
  };
  res.jsonp(response);
};

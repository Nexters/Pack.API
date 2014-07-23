'use strict';

exports.errorMsg = function(errorCode,errorMsg){
  return {
    status: errorCode,
    msg: errorMsg
  };
};


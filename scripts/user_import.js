#!/usr/bin/node

var mongoose = require('mongoose'),
  UserSchema = require('../packages/users/server/models/user');

var User = mongoose.model('User', UserSchema);
var mean = require('meanio'),
  config = mean.loadConfig();


mongoose.connect(config['db']);

user1 = {
    name: 'Full name222',
    email: 'test1234' + '@test.com',
    username: 'hello2',
    password: 'password',
    provider: 'local',
    token: 'token1'
};

var _user = new User(user1);
_user.save(function(err) {
  console.log('saved : ' + err);
  return ;
});

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    async = require('async'),
    config = require('meanio').loadConfig(),
    crypto = require('crypto'),
    passport = require('passport'),
    formidable = require('formidable'),
    util = require('util'),
    path = require('path'),
    mean = require('meanio'),
    templates = require('../template');

exports.authenticate_token = function(req, res, next) {
    passport.authenticate('token', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.fail('10001');
        }
        req.user = user;
        next();
    })(req,res,next);
};
/**
 * Show an User
 */
exports.show = function(req, res) {
    //res.jsonp(req.user);
    res.success(req.profile || null);
};
/**
 * List of Users
 */
exports.all = function(req, res) {
    User.find().sort('-created').populate('').exec(function(err, users) {
        if (err) {
            return res.fail('11000');
        }
        res.success(users);
    });
};
/**
*
*/
exports.login = function(req, res){
    if(res.isMobile()){
        var user = req.user;
        user.token = user.makeSalt();
        user.save(function(err) {
            if (err) {
                return res.fail('10002');
            }
            res.success(user);
        });
    }else{
        res.send({
            user: req.user,
            redirect: (req.user.roles.indexOf('admin') !== -1) ? req.get('referer') : false
        });
    }
};
/**
 * Create user
 */
exports.create = function(req, res, next) {
    var form = new formidable.IncomingForm({
      keepExtensions: true
    });
    form.uploadDir = path.join(mean.app.get('uploadDir'),'users');
    form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, function(err, fields, files) {
      console.log(fields);
      var user = new User(fields);
      user.provider = 'local';
      /*
      // because we set our user.provider to local our models/user.js validation will always be true
      //req.assert('name', 'You must enter a name').notEmpty();
      user.assert('email', 'You must enter a valid email address').isEmail();
      user.assert('password', 'Password must be between 8-20 characters long').len(8, 20);
      //req.assert('username', 'Username cannot be more than 20 characters').len(1,20);
      user.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

      var errors = req.validationErrors();
      if (errors) {
        console.log(errors);
        res.fail('10010');
      }
      */
      user.token = user.makeSalt();
      if(!!files.image){
        user.image = path.join('users',path.basename(files.image.path));
      }
      user.roles = ['authenticated'];
      user.save(function(err) {
          if (err) {
              if(err.code === 11000){
                return res.fail('10003');
              }
              return res.fail('19000');
          }
          if(res.isMobile()){
            // 유저 이미지 업로드!
            res.success(user);
          }else{
            req.logIn(user, function(err) {
              if (err) return next(err);
              return res.redirect('/');
            });
          }
      });
    });
};
exports.check = function(req, res){
  var user = req.user;
};
/**

/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};

/**
 * Show login form
 */
exports.signin = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.redirect('#!/login');
};

/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/');
};

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
      .findOne({
          _id: id
      })
      .exec(function(err, user) {
          if (err) return next(err);
          if (!user) return next(new Error('Failed to load User ' + id));
          req.profile = user;
          next();
      });
};

/**
 * Resets the password
 */

exports.resetpassword = function(req, res, next) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (err) {
            return res.status(400).jsonp({msg: err});
        }
        if (!user) {
            return res.status(400).jsonp({msg: 'Token invalid or expired'});
        }
        req.assert('password', 'Password must be between 8-20 characters long').len(8, 20);
        req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
        var errors = req.validationErrors();
        if (errors) {
            return res.status(400).send(errors);
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        user.save(function(err) {
            req.logIn(user, function(err) {
                if (err) return next(err);
                return res.send({
                    user: user,
                });
            });
        });
    });
};

/**
 * Callback for forgot password link
 */
exports.forgotpassword = function(req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        function(token, done) {
            User.findOne({ $or : [ {email: req.body.text } , { username: req.body.text} ]} , function(err, user) {
                if ((err) || (!user)) {
                    done(true);
                }
                else {
                    done(err, user, token);
                }
            });
        },
        function(user, token, done) {
            user.resetPasswordToken = token;
            user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
            user.save(function(err) {
                done(err, token, user);
            });
        },
        function(token, user, done) {
            var mailOptions = {
                to: user.email,
                from: config.emailFrom
            };
            mailOptions = templates.forgot_password_email(user, req, token, mailOptions);
            config.sendMail(mailOptions);
            done(null, true);
        }
    ],
    function(err, status) {
        var response = {
            'message' : 'Mail successfully sent',
            'status' : 'success'
        };
        if (err) {
            response = {
                'message' : 'User does not exist',
                'status' : 'danger'
            };
            res.jsonp(response);
        }
        else {
            res.jsonp(response);
        }
    });
};


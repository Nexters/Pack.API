'use strict';

/**
 * Module dependencies.
 */
var mean = require('meanio'),
    compression = require('compression'),
    morgan = require('morgan'),
    consolidate = require('consolidate'),
    cookieParser = require('cookie-parser'),
    expressValidator = require('express-validator'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    assetmanager = require('assetmanager'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session),
    helpers = require('view-helpers'),
    flash = require('connect-flash'),
    useragent = require('express-useragent'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    config = mean.loadConfig();

module.exports = function(app, passport, db) {
    app.set('showStackError', true);

    // Prettify HTML
    app.locals.pretty = true;

    // cache=memory or swig dies in NODE_ENV=production
    app.locals.cache = 'memory';

    // Should be placed before express.static
    // To ensure that all assets and data are compressed (utilize bandwidth)
    app.use(compression({
        // Levels are specified in a range of 0 to 9, where-as 0 is
        // no compression and 9 is best compression, but slowest
        level: 9
    }));

    // Only use logger for development environment
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }

    // assign the template engine to .html files
    app.engine('html', consolidate[config.templateEngine]);

    // set .html as the default extension
    app.set('view engine', 'html');

    // Enable jsonp
    app.enable('jsonp callback');

    // The cookieParser should be above session
    app.use(cookieParser());

    // Request body parsing middleware should be above methodOverride
    app.use(expressValidator());
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json({ extended: true }));
    //app.use(bodyParser({ extended: true }));
    app.use(methodOverride());

    /**
     * Author : RANGKEN
     * Add req,res base method either mobile/json or html/angluar response
     *
     */
     /* 업로드 디렉토리 생성 */
    var uploadDir = path.join(__dirname, '../public');
    (function(directories){
      for(var i in directories){
        mkdirp(path.join(uploadDir, directories[i]));
      }
    }(['users','stations','places']));
    app.set('uploadDir', uploadDir);
    app.use(useragent.express());
    app.use(function (req, res, next) {
      res.isMobile = function(){
        // 테스트를 위해 Curl 은 무조건 모바일로 판단!
        return req.useragent.isMobile || req.useragent.Platform == 'Curl';
      }
      /*
      *   response success
      *   @param {String} data : response object
      */
      res.success = function(data){
        var response = {
            status: '0',
            msg: 'no error',
            data: data
        };
        // 비밀번호 해쉬는 보내지 않는다.
        // 유저 모델쪽에서 처리할 예정
        /*
        if(data.hashed_password != null){
            data.hashed_password = undefined;
        }
        */
        if(this.isMobile()){
            this.jsonp(response);
        }else{
            this.jsonp(data);
        }
      };
      /*
      *   response fail
      *   @param {String} errorCode : error Code number
      *   @param {String} errorMsg : error Message for client Alert text
      */
      res.fail = function(errorCode){
          var location = req.query.local || 'ko'

          var response = {
              status: errorCode,
              msg: config.error[location][errorCode] || 'Unknown Error'
          };
          if(this.isMobile()){
              this.jsonp(response);
          }else{
              this.jsonp(response);
          }
      };
      next();
    });
    // Import the assets file and add to locals
    var assets = assetmanager.process({
        assets: require('./assets.json'),
        debug: process.env.NODE_ENV !== 'production',
        webroot: /public\/|packages\//g
    });

    // Add assets to local variables
    app.use(function(req, res, next) {
        res.locals.assets = assets;

        mean.aggregated('js', 'header', function(data) {
            res.locals.headerJs = data;
            next();
        });
    });

    // Express/Mongo session storage
    app.use(session({
        secret: config.sessionSecret,
        store: new mongoStore({
            db: db.connection.db,
            collection: config.sessionCollection
        }),
        cookie: config.sessionCookie,
        name: config.sessionName,
        resave: true,
        saveUninitialized: true
    }));

    // Dynamic helpers
    app.use(helpers(config.app.name));

    // Use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    //mean middleware from modules before routes
    app.use(mean.chainware.before);

    // Connect flash for flash messages
    app.use(flash());
};

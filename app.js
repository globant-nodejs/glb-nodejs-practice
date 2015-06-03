var express = require('express'),
    path = require('path'),
    http = require('http'),
    debug = require('debug')('testApp:server'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    routes = require('./src/routes.js'),
    cors=require('cors'),
    app = express();

    app.set('port',3000);


if (app.get('env') === 'production') {
  console.log('Production environment');
  app.use(function(req,res){
    res.send("Production Server");
  });
}

if (app.get('env') === 'development') {
  app.use(cors());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/', routes);
}




module.exports = app;

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
global. errorhandler = require('errorhandler');
require('dotenv').config();
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var twitterRouter = require('./routes/twitter');
var githubRouter = require('./routes/GHlogin');
var fbRouter = require('./routes/FBlogin');
var pollsRouter = require('./routes/polls');
var mysql = require('mysql'); 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',twitterRouter);
app.use('/',pollsRouter);
app.use('/',fbRouter);
app.use('/',githubRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
var mysql = require('mysql');/*
global. con = mysql.createConnection({
host: 'sql2.freesqldatabase.com',
name: 'sql2285554',
user: 'sql2285554',
password:'xZ5*yQ8*',
  database:"sql2285554",
Port: 3306});*/
global. con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"pinterestdb"
});
console.log((con.config.database));
con.connect(function(err) {
  if (err) {
    console.log("error connect DB"+err);}
    else{
        console.log("Connected!");
    }
    
});
module.exports = app;

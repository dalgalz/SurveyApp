// require express and path
const express = require('express');
const path = require('path');

const bosdyParser = require('body-parser');
const port = process.env.PORT || 8000;

const app = express();

app.use(bosdyParser.json());
app.use(bosdyParser.urlencoded({ extended: true }));

app.use(express.static(path.resolve('dist')));

require('./server/config/database');
// store the function in a variable
const routes_setter = require('./server/config/routes');
// invoke the function stored in routes_setter and pass it the "app" variable
routes_setter(app)
//app.use(require('./server/config/routes/catchall-routes'));


app.listen(port, () => console.log(`express listening on port ${ port }`));


/*var express = require("express");
var path = require("path");
// create the express app
var app = express();
// require bodyParser since we need to handle post data for adding a user
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
// static content 
app.use(express.static(path.join(__dirname, "./angular-app/dist")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');
// require the mongoose configuration file which does the rest for us
require('./server/config/mongoose.js');
// store the function in a variable
var routes_setter = require('./server/config/routes.js');
// invoke the function stored in routes_setter and pass it the "app" variable
routes_setter(app)
// tell the express app to listen on port 8000
app.listen(8000, function() {
  console.log("listening on port 8000");
})*/

var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var routes = require('./routes/login');

var app = express();
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static('public'));  // to support send static files
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use('/', routes);

module.exports = app;

app.listen(3000);
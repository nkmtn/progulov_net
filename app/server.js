/*
    server.js - main file.
    Used node.js with express.
*/

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

const port = 3000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({
    extended: true
})); // to support URL-encoded bodies
app.use(express.static('public'));  // to support send static files

app.use('/', routes);

module.exports = app;

// Port what used
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

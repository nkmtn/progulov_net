var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var cors = require('cors');

var routes = require('./routes/login');

var app = express();
app.use(express.json())
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.static('public'));  // to support send static files
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use(cors({
    origin: true,
    credentials: true
}));

app.use('/', routes);
app.use('/user', routes);
app.use('/group', routes);
app.use('/lecturer', routes);
app.use('/subject', routes);
app.use('/attendance', routes);
app.use('/lessons', routes);

module.exports = app;

app.listen(3000);
/*
    server.js - main file.
    Used node.js with express.
*/

var express = require('express');
var app = express();

const port = 8888;

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({
    extended: true
})); // to support URL-encoded bodies
app.use(express.static('public'));  // to support send static files


app.get('/', function (req, res) {
  res.send('Hello World!');
});

// Port vhat used
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('./queries')
var help = require('./formatHelpers');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/products', (req, res) => {
  db.getLimitedProducts().then((data) => {
    res.send(data).end();
  }).catch((err) => { console.log(err); })
})

app.get('/products/:id', (req, res) => {
  db.getSpecificProduct(req.params.id).then((data) => {
    res.send(data).end();
  }).catch((err) => { console.log(err); })
})

app.get('/products/:id/styles', (req, res) => {
  db.getStyles(req.params.id).then((data) => {
    res.send(data).end();
  }).catch((err) => { console.log(err); })
})

module.exports = app;
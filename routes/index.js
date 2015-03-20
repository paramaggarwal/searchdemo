var express = require('express');
var router = express.Router();

var React = require('react');
var App = require('../ui');

/* GET home page. */
router.get('/', function(req, res, next) {

  var page = React.renderToString(<App />);
  var props = {};
  
  res.render('index', {
    title: 'Express',
    page: page,
    props: props
  });
});

module.exports = router;

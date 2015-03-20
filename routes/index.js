var express = require('express');
var router = express.Router();

var React = require('react');
var search = require('../clients/search');
var App = require('../ui');

/* GET home page. */
router.get('/', function(req, res, next) {

  var term = req.query.q;

  if (term) {
    search(term, function (err, data) {
      if (err) {
        res.status(500).send(err);
      };

      var props = {
        data: data
      };

      res.render('index', {
        title: 'Search Myntra',
        page: React.renderToString(<App {...props} />),
        props: props
      });
    });

  } else {
    var props = {};  
    res.render('index', {
      title: 'Search Myntra',
      page: React.renderToString(<App {...props} />),
      props: props
    });
  }
});

module.exports = router;

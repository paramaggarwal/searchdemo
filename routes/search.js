var express = require('express');
var router = express.Router();

var superagent = require('superagent');

/* GET search listing. */
router.get('/:term', function(req, res, next) {
  var term = req.params.term;

  superagent.get('http://developer.myntra.com/search/data/' + term, function (err, data) {
    if (err) {
      return res.status(500).send(err);
    };

    res.send(data.body);
  });
});

module.exports = router;

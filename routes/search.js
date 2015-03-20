var express = require('express');
var router = express.Router();

var search = require('../clients/search');

/* GET search listing. */
router.get('/:term', function(req, res, next) {
  var term = req.params.term;

  search(term, function (err, data) {
    if (err) {
      return res.status(500).send(err);
    };

    res.send(data);
  });
});

module.exports = router;

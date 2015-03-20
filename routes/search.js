var express = require('express');
var router = express.Router();

var search = require('../clients/search');

/* GET search listing. */
router.get('/', function(req, res, next) {
  var term = req.query.q;

  search(term, function (err, data) {
    if (err) {
      return res.status(500).send(err);
    };

    res.send(data);
  });
});

module.exports = router;

var superagent = require('superagent');

var search = function (term, cb) {

  superagent.get('http://developer.myntra.com/search/data/' + term, function (err, data) {
    if (err) {
      return cb(err);
    };

    cb(null, data.body);
  });
}

module.exports = search;
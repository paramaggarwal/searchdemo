var _ = require('underscore');
var superagent = require('superagent');
var elasticsearch = require('elasticsearch');
var es = new elasticsearch.Client();

var search = function (term, cb) {

  es.search({
    index: 'demo',
    type: 'product',
    q: term
  }, function (err, data) {
    if (err) {
      return cb(err);
    };

    var totalCount = data.hits.total;
    var results = _.pluck(data.hits.hits, '_source');

    cb(null, {
      totalCount: totalCount,
      results: results
    });
  });
}

module.exports = search;
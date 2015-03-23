var _ = require('underscore');
var React = require('react');
var superagent = require('superagent');

var Product = React.createClass({

  render: function () {
    var product = this.props.product;

    return (
      <div style={{display: 'inline-block'}}>
        <a href={'http://myntra.com/' + product.styleid} target='_blank'>
          <img src={getImageURL(product)} width={160} />
        </a>
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function () {
    return {
      term: this.props.term
    };
  },

  propTypes: {
    data: React.PropTypes.object,
    term: React.PropTypes.string
  },

  search: function (e) {
    e.preventDefault();
    var self = this;
    var term = (e.type === 'submit') ? e.target.q.value : e.target.value;

    this.setState({
      term: term
    });
    window.history.pushState({}, 'Search Myntra', '/?q='+term.replace(/\W/gi, '+'));

    superagent.get('/search').query({q: term}).end(function (err, res) {
      if (err) {
        return console.log(err);
      };

      self.setState({
        data: res.body
      });
    });
  },

  render: function () {
    var data = this.state.data || this.props.data;

    return (
      <div>
        <h1>Search Myntra</h1>
        <p>{data ? data.data.totalProductsCount + ' results' : ''}</p>
        <form action='/' method='get' onSubmit={this.search} >
          <input type='text' name='q' onChange={this.search} value={this.state.term} /> 
          <input type='submit' value='Search' />
        </form>
        <br /><br />
        {data ? data.data.results.products.map(function (product, i) { return <Product key={product.id} product={product} /> }) : ''}
      </div>
    );
  }
});

function getImageURL (product) {

  var imageURL = product.search_image;
  var imageEntry = JSON.parse(product.imageEntry_default);
  if (imageEntry && imageEntry.servingUploaderType === 'CL') {
    imageURL = imageEntry.domain + 'w_320/' + imageEntry.relativePath;
  } else if (imageEntry && imageEntry.servingUploaderType === 'S3') {
    imageURL = imageEntry.domain + imageEntry.resolutionFormula.replace('($width)', '180').replace('($height)', '240');
  }

  return imageURL;
};

module.exports = App;
var _ = require('underscore');
var React = require('react');
var superagent = require('superagent');

var Product = React.createClass({

  render: function () {
    var product = this.props.product;

    var imageURL = product.search_image;
    var imageEntry = JSON.parse(product.imageEntry_default);
    if (imageEntry && imageEntry.servingUploaderType === 'CL') {
      imageURL = imageEntry.domain + 'w_320/' + imageEntry.relativePath;
    } else if (imageEntry && imageEntry.servingUploaderType === 'S3') {
      imageURL = imageEntry.domain + imageEntry.resolutionFormula.replace('($width)', '180').replace('($height)', '240');
    }

    return (
      <div style={{display: 'inline-block'}}>
        <img src={imageURL} width={160} />
        {/*//product.brands_filter_facet*/}
      </div>
    );
  }
});

var App = React.createClass({
  getInitialState: function () {
    return {};
  },

  propTypes: {
    data: React.PropTypes.object
  },

  search: function (e) {
    e.preventDefault();
    var self = this;
    var term = (e.type === 'submit') ? e.target.q.value : e.target.value;

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
          <input type='text' name='q' onChange={this.search} /> 
          <input type='submit' value='Search' />
        </form>
        <br /><br />
        {data ? data.data.results.products.map(function (product, i) { return <Product key={product.id} product={product} /> }) : ''}
      </div>
    );
  }
});

module.exports = App;
var _ = require('underscore');
var React = require('react');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Search Myntra</h1>
        <form action='/' method='get'>
          <input type='text' name='q' /> 
          <input type='submit' value='Search' />
        </form>
      </div>
    );
  }
});

module.exports = App;
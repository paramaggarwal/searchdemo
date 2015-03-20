var _ = require('underscore');
var React = require('react');

var App = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Hello</h1>
        <form>
          <input type='text' /> 
        </form>
      </div>
    );
  }
});

module.exports = App;
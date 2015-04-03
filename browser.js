var React = require('react');

var App = require('./ui/index.jsx');
var props = window.APP_PROPS;

React.render(<App {...props} />, document.getElementById('react'));
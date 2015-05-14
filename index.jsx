var React = require('react');
var SearchContainer = require('./SearchContainer');
var FAKE_RESULTS = require('./test/support/sampleData.js').fakeResults;

React.render(
  <SearchContainer />,
  document.getElementById('content')
);

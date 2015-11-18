'use strict';

var React = require('react-native');
var {
  AppRegistry,
} = React;

let Main = require('./app/components/main.js');

var ReactNativeTodos = React.createClass({
  render: function() {
    return (
      <Main />
    );
  }
});

AppRegistry.registerComponent('ReactNativeTodos', () => ReactNativeTodos);

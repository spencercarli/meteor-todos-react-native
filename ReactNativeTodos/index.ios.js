'use strict';

let React = require('react-native');
let {
  AppRegistry,
} = React;

// Polyfill the process functionality needed for minimongo-cache
global.process = require("./app/config/process.polyfill");

let Layout = require('./app/components/Layout');

let ReactNativeTodos = React.createClass({
  render: function() {
    return <Layout />;
  }
});

AppRegistry.registerComponent('ReactNativeTodos', () => ReactNativeTodos);

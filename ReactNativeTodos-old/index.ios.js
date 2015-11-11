'use strict';

let React = require('react-native');
let {
  AppRegistry,
} = React;

// Polyfill the process functionality needed for minimongo-cache
global.process = require("./app/config/process.polyfill");

let LayoutContainer = require('./app/components/LayoutContainer');

let ReactNativeTodos = React.createClass({
  render: function() {
    return <LayoutContainer />;
  }
});

AppRegistry.registerComponent('ReactNativeTodos', () => ReactNativeTodos);

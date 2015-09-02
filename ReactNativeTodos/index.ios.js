'use strict';

let React = require('react-native');
let {
  AppRegistry,
} = React;

let Layout = require('./app/components/Layout');

let ReactNativeTodos = React.createClass({
  render: function() {
    return <Layout />;
  }
});

AppRegistry.registerComponent('ReactNativeTodos', () => ReactNativeTodos);

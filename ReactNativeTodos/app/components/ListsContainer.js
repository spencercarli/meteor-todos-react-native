let React = require('react-native');
let {
  View,
  Text
} = React;

let Lists = require('./Lists');

const STATIC_LISTS = [
  {name: 'Meteor Principles'},
  {name: 'Languages'},
  {name: 'Favorite Scientists'},
];

let Layout = React.createClass({
  getInitialState() {
    return {
      lists: STATIC_LISTS
    }
  },

  render() {
    return <Lists lists={this.state.lists} />;
  }
});

module.exports = Layout;

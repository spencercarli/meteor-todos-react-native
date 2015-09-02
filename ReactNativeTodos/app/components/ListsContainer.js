let React = require('react-native');
let {
  View,
  Text
} = React;

let Lists = require('./Lists');

const STATIC_LISTS = [
  {_id: 1, name: 'Meteor Principles'},
  {_id: 2, name: 'Languages'},
  {_id: 3, name: 'Favorite Scientists'},
];

let ListsContainer = React.createClass({
  getInitialState() {
    return {
      lists: STATIC_LISTS
    }
  },

  render() {
    return (
      <Lists
        lists={this.state.lists}
        navigator={this.props.navigator}
        />
    );
  }
});

module.exports = ListsContainer;

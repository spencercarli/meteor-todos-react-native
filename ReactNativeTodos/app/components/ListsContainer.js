let React = require('react-native');
let {
  View,
  Text
} = React;

let Lists = require('./Lists');
let ddp = require('../config/ddp');

let ListsContainer = React.createClass({
  getInitialState() {
    return {
      lists: []
    }
  },

  componentWillMount() {
    ddp.subscribe('publicLists')
      .then(() => {
        this.setState({lists: ddp.collections.lists.find()});
      });
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

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
      lists: [],
      listsObserver: null
    }
  },

  componentWillMount() {
    ddp.subscribe('publicLists')
      .then(() => {
        let listsObserver = ddp.collections.observe(() => {
          return ddp.collections.lists.find()
        });

        this.setState({listsObserver: listsObserver});

        listsObserver.subscribe((results) => {
          this.setState({lists: results});
        });
      });
  },

  componentWillUnmount() {
    if (this.state.listsObserver) {
      this.state.listsObserver.dispose();
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

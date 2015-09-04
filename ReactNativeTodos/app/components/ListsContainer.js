let React = require('react-native');
let {
  View,
  Text
} = React;

let Lists = require('./Lists');
let ddp = require('../config/ddp');

let ListsContainer = React.createClass({
  displayName: 'ListsContainer',

  propTypes: {
    userId: React.PropTypes.string,
    navigator: React.PropTypes.object
  },

  getInitialState() {
    return {
      lists: [],
      listsObserver: null
    }
  },

  componentWillReceiveProps(props) {
    this.runSub(props.userId);
  },

  componentWillMount() {
    this.runSub(this.props.userId);
  },

  componentWillUnmount() {
    if (this.state.listsObserver) {
      this.state.listsObserver.dispose();
    }
  },

  runSub(userId) {
    let subName = 'publicLists';
    let query = { userId: null };

    if (userId) {
      subName = 'privateLists'; // Refactor
      query = { userId: userId };
    }

    ddp.subscribe(subName)
      .then(() => {
        let listsObserver = ddp.collections.observe(() => {
          return ddp.collections.lists.find(query)
        });

        this.setState({listsObserver: listsObserver});

        listsObserver.subscribe((results) => {
          this.setState({lists: results});
        });
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

let React = require('react-native');
let {
  View,
  Text
} = React;

let Lists = require('./Lists');
let ddp = require('../config/ddp');

let ListsContainer = React.createClass({
  propTypes() {
    return {
      userId: React.PropTypes.string
    }
  },

  getInitialState() {
    return {
      lists: [],
      listsObserver: null
    }
  },

  componentWillMount() {
    let subName = 'publicLists';
    let subParams = [];
    let query = { userId: null };

    if (this.props.userId) {
      subName = 'privateLists2'; // Refactor
      query = { userId: this.props.userId };
      subParams.push(this.props.userId); // Refactor
    }

    ddp.subscribe(subName, subParams)
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

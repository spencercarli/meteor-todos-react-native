let React = require('react-native');
let {
  View,
  Text,
  AlertIOS,
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

  handleChangePublicityClick(list, makePublic) {
    let mod = {$unset: {userId: true}};
    if (makePublic) {
      let userId = ddp.collections.users.findOne()._id;
      mod = {$set: {userId: userId}};
    }
    ddp.call('Lists.update', [list._id, mod]);
  },

  handleDeleteListClick(list) {
    AlertIOS.alert(
      'Are you sure?',
      'Are you sure you want to delete ' + list.name,
      [
        {text: 'Cancel'},
        {text: 'Delete', onPress: () => {
          this.props.navigator.pop();
          ddp.call('Lists.remove', [list._id]);
        }},
      ]
    );
  },

  render() {
    return (
      <Lists
        lists={this.state.lists}
        navigator={this.props.navigator}
        changePublicity={this.handleChangePublicityClick}
        deleteList={this.handleDeleteListClick}
        />
    );
  }
});

module.exports = ListsContainer;

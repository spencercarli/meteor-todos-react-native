import React, {
  StyleSheet,
  View,
  Text,
  ScrollView,
  PixelRatio,
  TouchableHighlight,
  Image,
} from 'react-native';

import Todos from '../todos/todos';
import ListItemAdd from './listItemAdd';
import ListOptions from './listOptions';

import ListsDB from '../../config/db/lists';
import Accounts from '../../config/db/accounts';

import chevronRight from '../../images/fa-chevron-right/fa-chevron-right.png';

export default React.createClass({
  // Configuration
  displayName: 'Lists',

  // Initial Value (State and Props)
  getInitialState() {
    return {
      lists: [],
      user: {}
    }
  },

  // Component Lifecycle
  componentWillMount() {
    ListsDB.subscribeToLists()
      .then(() => {
        ListsDB.observeLists((results) => {
          this.setState({lists: results});
        });
      })
      .catch((err) => {
        console.log('Error: ', err);
      });

    Accounts.userId.then((userId) => {
      if (userId) {
        this.setState({user: {_id: userId}});
      }
    });

    Accounts.emitter.on('loggedIn', (userId) => {
      if (userId) {
        this.setState({user: {_id: userId}});
      }
    });

    Accounts.emitter.on('loggedOut', () => {
      this.setState({user: {}});
    });
  },

  // Event Handlers
  handlePress(list) {
    let nav = this.props.navigator;
    let {user} = this.state;

    if (!nav) return;

    let rightButton = (
      <ListOptions
        navigator={nav}
        list={list}
        user={user}
        />
    );

    nav.push({
      component: Todos,
      title: list.name,
      leftButton: {
        title: "Back",
        handler: () => nav.pop()
      },
      rightButton: rightButton,
      passProps: {
        listId: list._id
      }
    });
  },

  // Sub-render
  renderItems() {
    return this.state.lists.map((list, i) => {
      return (
        <View key={list._id}>
          <TouchableHighlight
            underlayColor='rgba(0, 0, 0, 0.1)'
            onPress={() => this.handlePress(list)}
            >
            <View style={styles.row}>
              <View style={styles.incomplete}>
                <Text style={styles.incompleteText}>{list.incompleteCount}</Text>
              </View>

              <Text>{list.name}</Text>

              <Image
                source={chevronRight}
                style={styles.rightIcon}
                />
            </View>
          </TouchableHighlight>
          <View style={styles.border} />
        </View>
      )
    });
  },

  // Component Render
  render() {
    return (
      <ScrollView>
        <ListItemAdd />
        {this.renderItems()}
      </ScrollView>
    );
  }
});

const styles = StyleSheet.create({
  row: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  border: {
    height: 1 / PixelRatio.get(),
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  rightIcon: {
    position: 'absolute',
    right: 15,
    tintColor: 'rgba(0, 0, 0, 0.25)'
  },
  incompleteText: {
    color: '#ffffff',
  },
  incomplete: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

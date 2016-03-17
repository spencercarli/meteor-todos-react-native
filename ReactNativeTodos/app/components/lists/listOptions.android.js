import React, {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import icon from '../../images/fa-cog/fa-cog.png';

import ListsDB from '../../config/db/lists';

export default React.createClass({
  // Configuration
  displayName: 'List Options',
  propTypes: {
    list: React.PropTypes.object,
    user: React.PropTypes.object
  },

  // Event Handlers
  handleOptions() {
    let {list, user} = this.props;

    let button = "Make Private";
    if (list.userId) {
      button = "Make Public";
    }

    const deleteList = () => {
      this.props.navigator.pop();
      ListsDB.deleteList(this.props.list._id);
    }

    const handleVisibility = () => {
      if (Object.keys(user).length > 0) {
        if (list.userId) {
          ListsDB.changeListVisibility(list._id, null);
        } else {
          ListsDB.changeListVisibility(list._id, user._id);
        }
      } else {
        Alert.alert(
          'Not Logged In',
          'Please sign in or create an account to make private lists.',
          [
            { text: 'Okay'}
          ]
        );
      }
    }

    Alert.alert(
      'Options',
      '',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Delete', onPress: deleteList },
        {text: button, onPress: handleVisibility }
      ]
    )
  },

  // Component Render
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.handleOptions}
        >
        <Image
          source={icon}
          style={styles.icon}
          />
      </TouchableOpacity>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    marginRight: 8
  },
  icon: {
    tintColor: 'rgba(0, 0, 0, 0.5)'
  }
});

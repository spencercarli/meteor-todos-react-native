import React, {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActionSheetIOS,
  AlertIOS,
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
    let buttons = ['Make Private', 'Delete', 'Cancel'];
    let {list, user} = this.props;

    if (list.userId) {
      buttons[0] = "Make Public";
    }

    ActionSheetIOS.showActionSheetWithOptions({
      options: buttons,
      cancelButtonIndex: 2,
      destructiveButtonIndex: 1
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        if (Object.keys(user).length > 0) {
          if (list.userId) {
            ListsDB.changeListVisibility(list._id, null);
          } else {
            ListsDB.changeListVisibility(list._id, user._id);
          }
        } else {
          AlertIOS.alert(
            'Not Logged In',
            'Please sign in or create an account to make private lists.',
            [
              { text: 'Okay'}
            ]
          );
        }
      } else if (buttonIndex === 1) {
        this.props.navigator.pop();
        ListsDB.deleteList(this.props.list._id);
      }
    });
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

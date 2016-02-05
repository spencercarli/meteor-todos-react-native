import React from 'react-native';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActionSheetIOS,
  Navigator
} from 'react-native';

import icon from '../images/fa-cog/fa-cog.png';
import SignUp from './accounts/signUp';
import SignIn from './accounts/signIn';

import Accounts from '../config/db/accounts';

export default React.createClass({
  // Configuration
  displayName: 'App Options',

  // Initial State
  getInitialState() {
    return {
      user: {}
    };
  },

  // Lifecycle Events
  componentWillMount() {
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
  handleLoggedIn(nav) {
    let buttons = ['Sign Out', 'Cancel'];
    ActionSheetIOS.showActionSheetWithOptions({
      options: buttons,
      cancelButtonIndex: 1,
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        Accounts.signOut();
      }
    });
  },

  handleLoggedOut(nav) {
    let buttons = ['Sign Up', 'Sign In', 'Cancel'];
    ActionSheetIOS.showActionSheetWithOptions({
      options: buttons,
      cancelButtonIndex: 2,
    }, (buttonIndex) => {
      if (buttonIndex === 0) {
        nav.push({
          title: 'Sign Up',
          component: SignUp,
          sceneConfig: Navigator.SceneConfigs.VerticalUpSwipeJump,
          leftButton: {
            title: 'Cancel',
            handler: () => nav.pop()
          }
        });
      } else if (buttonIndex === 1) {
        nav.push({
          title: 'Sign In',
          component: SignIn,
          sceneConfig: Navigator.SceneConfigs.VerticalUpSwipeJump,
          leftButton: {
            title: 'Cancel',
            handler: () => nav.pop()
          }
        });
      }
    });
  },

  handleOptions() {
    let nav = this.props.navigator;

    if (Object.keys(this.state.user).length > 0) {
      this.handleLoggedIn(nav);
    } else {
      this.handleLoggedOut(nav);
    }
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

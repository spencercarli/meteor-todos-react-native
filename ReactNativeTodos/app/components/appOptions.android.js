import React, {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
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

  handleLoggedIn() {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Sign Out', onPress: () => Accounts.signOut() }
      ]
    )
  },

  handleLoggedOut(nav) {

    const signUp = () => {
      nav.push({
        title: 'Sign Up',
        component: SignUp,
        sceneConfig: Navigator.SceneConfigs.FloatFromBottomAndroid,
        leftButton: {
          title: 'Cancel',
          handler: () => nav.pop()
        }
      });
    }

    const signIn = () => {
      nav.push({
        title: 'Sign In',
        component: SignIn,
        sceneConfig: Navigator.SceneConfigs.FloatFromBottomAndroid,
        leftButton: {
          title: 'Cancel',
          handler: () => nav.pop()
        }
      });
    }

    Alert.alert(
      'Login',
      'Do you want to create a new account or sign in with an existing account?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Sign Up', onPress: signUp },
        {text: 'Sign In', onPress: signIn }
      ]
    )
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

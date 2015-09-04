'use strict';

let React = require('react-native');
let {
  View,
  Text,
  TabBarIOS,
  NavigatorIOS,
  Navigator,
} = React;

let ListsContainer = require('./ListsContainer');
let SignIn = require('./SignIn');
let Join = require('./Join');

let Layout = React.createClass({
  propTypes() {
    return {
      userId: React.PropTypes.string,
      loggedIn: React.PropTypes.bool,
      changeLogin: React.PropTypes.func
    }
  },

  getInitialState() {
    return {
      selectedTab: 'public'
    }
  },

  handleLogout() {
    this.refs.privateNavigator.push({
      id: 'signIn'
    })
    this.props.changeLogin({loggedIn: false});
  },

  handleLogin(res) {
    this.refs.privateNavigator.push({
      id: 'list'
    })
    this.props.changeLogin(res);
  },

  renderPublicNavigator() {
    return (
      <NavigatorIOS
        style={{flex: 1}}
        initialRoute={{
          component: ListsContainer,
          title: 'Public Lists',
        }}
        />
    );
  },

  renderPrivateScene(route, navigator) {
    if (route.id === 'list') {
      return (
        <NavigatorIOS
          style={{flex: 1}}
          initialRoute={{
            component: ListsContainer,
            title: 'Private Lists',
            passProps: { userId: this.props.userId },
            rightButtonTitle: 'Logout',
            onRightButtonPress: () => {
              this.handleLogout();
            }
          }}
          />
      );
    } else if (route.id === 'join') {
      return <Join navigator={navigator} />;
    } else {
      return (
        <SignIn
          navigator={navigator}
          changeLogin={this.handleLogin}
          />
      );
    }
  },

  renderPrivateNavigator() {
    let initialRoute = { id: 'signIn', index: 0 };
    if (this.props.userId) {
      initialRoute.id = 'list';
    }

    return (
      <Navigator
        ref="privateNavigator"
        initialRoute={initialRoute}
        renderScene={this.renderPrivateScene}
        configureScene={(route) => {
          let config = Navigator.SceneConfigs.FloatFromBottom
          if (route.sceneConfig) {
            config = route.sceneConfig;
          }
          config.gestures = {}; // Disable gestures
          return config;
        }}
      />
    );
  },

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Public Lists"
          icon={require('image!public')}
          selected={this.state.selectedTab === 'public'}
          onPress={() => {
            this.setState({
              selectedTab: 'public',
            });
          }}>
          {this.renderPublicNavigator()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Private Lists"
          icon={require('image!private')}
          selected={this.state.selectedTab === 'private'}
          onPress={() => {
            this.setState({
              selectedTab: 'private',
            });
          }}>
          {this.renderPrivateNavigator()}
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
});

module.exports = Layout;

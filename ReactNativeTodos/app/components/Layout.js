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
let ddpClient = require('../config/ddp');

let ROUTE_RESET = false;

let Layout = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'public'
    }
  },

  componentWillMount() {
    console.log('will mount');
    ddpClient.initialize();
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
    if (route.id === 'signIn') {
      return <SignIn navigator={navigator} />;
    } else if (route.id === 'join') {
      return <Join navigator={navigator} />;
    } else {
      return (
        <NavigatorIOS
          style={{flex: 1}}
          initialRoute={{
            component: ListsContainer,
            title: 'Private Lists',
          }}
          />
      );
    }
  },

  renderPrivateNavigator() {
    setTimeout(()=> {
      if (this.refs.privateNavigator && !ROUTE_RESET) {
        this.refs.privateNavigator.push({
          id: 'signIn'
        });
        ROUTE_RESET = true;
      }
    }, 100);

    return (
      <Navigator
        ref="privateNavigator"
        initialRoute={{id: 'list', index: 0}}
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

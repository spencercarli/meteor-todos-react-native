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

let Layout = React.createClass({
  getInitialState() {
    return {
      selectedTab: 'public'
    }
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

  renderPrivateNavigator() {
    setTimeout(()=> {
      if (this.refs.privateNavigator) {
        this.refs.privateNavigator.push({
          id: 'signIn'
        });
      }
    }, 2000);

    return (
      <Navigator
        ref="privateNavigator"
        initialRoute={{name: 'My First Scene', index: 0}}
        configureRoute={(route) => Navigator.SceneConfigs.FloatFromBottom }
        renderScene={(route, navigator) => {
          if (route.id === 'signIn') {
            return (
              <View style={{backgroundColor: 'red', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Sign in</Text>
              </View>
            );
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

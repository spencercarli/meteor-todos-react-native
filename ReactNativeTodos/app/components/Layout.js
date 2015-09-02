'use strict';

let React = require('react-native');
let {
  View,
  Text,
  TabBarIOS,
  NavigatorIOS
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
    )
  },

  renderPrivateNavigator() {
    return (
      <NavigatorIOS
        style={{flex: 1}}
        initialRoute={{
          component: ListsContainer,
          title: 'Private Lists',
        }}
        />
    )
  },

  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item
          title="Public Lists"
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

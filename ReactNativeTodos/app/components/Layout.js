let React = require('react-native');
let {
  View,
  Text,
  TabBarIOS,
  NavigatorIOS,
  Navigator,
  ActionSheetIOS,
} = React;

let ListsContainer = require('./ListsContainer');
let SignIn = require('./SignIn');
let Join = require('./Join');

let Layout = React.createClass({
  displayName: 'Layout',

  propTypes: {
    userId: React.PropTypes.string,
    loggedIn: React.PropTypes.bool,
    changeLogin: React.PropTypes.func
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
      id: 'list',
      userId: res.userId
    })
    this.props.changeLogin(res);
  },

  handleMore(isPrivate) {
    let options = ["Add New List", "Cancel"];
    if (isPrivate === true) {
      options.push("Logout");
    }

    ActionSheetIOS.showActionSheetWithOptions({
      options: options,
      cancelButtonIndex: 1,
      destructiveButtonIndex: 2,
    },
    (buttonIndex) => {
      if (buttonIndex === 0) {
        // Add a new list
        this.props.addNewList(isPrivate);
      } else if (buttonIndex === 2 && isPrivate) {
        this.handleLogout({loggedIn: false});
      }
    });
  },

  renderPublicNavigator() {
    return (
      <NavigatorIOS
        style={{flex: 1}}
        initialRoute={{
          component: ListsContainer,
          title: 'Public Lists',
          rightButtonTitle: 'More',
          onRightButtonPress: () => {
            this.handleMore(false);
          }
        }}
        />
    );
  },

  renderPrivateScene(route, navigator) {
    if (route.id === 'list') {
      let userId = this.props.userId;

      if (route.userId) {
        userId = route.userId;
      }

      return (
        <NavigatorIOS
          style={{flex: 1}}
          initialRoute={{
            component: ListsContainer,
            title: 'Private Lists',
            passProps: { userId: userId },
            rightButtonTitle: 'More',
            onRightButtonPress: () => {
              this.handleMore(true);
            }
          }}
          />
      );
    } else if (route.id === 'join') {
      return (
        <Join
          navigator={navigator}
          changeLogin={this.handleLogin}
          />
      )
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

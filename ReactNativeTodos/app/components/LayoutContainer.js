'use strict';

let React = require('react-native');
let {
  View,
  Text,
} = React;

let Layout = require('./Layout');
let ddp = require('../config/ddp');

let LayoutContainer = React.createClass({
  getInitialState() {
    return {
      connected: false,
      loggedIn: false
    }
  },

  componentWillMount() {
    ddp.initialize()
      .then(() => {
        return ddp.loginWithToken();
      })
      .then((loggedIn) => {
        this.setState({connected: true, loggedIn: loggedIn});
      });
  },

  changeLoginState(loggedIn) {
    if (!loggedIn) {
      ddp.logout();
    }
    this.setState({loggedIn: loggedIn});
  },

  render() {
    if (this.state.connected) {
      return (
        <Layout
          loggedIn={this.state.loggedIn}
          changeLogin={this.changeLoginState}
          />
      );
    } else {
      return (
        <View>
          <Text>Connecting</Text>
        </View>
      )
    }
  }
});

module.exports = LayoutContainer;

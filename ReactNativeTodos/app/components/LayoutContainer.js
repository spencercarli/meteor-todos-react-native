'use strict';

let React = require('react-native');
let {
  View,
  Text,
} = React;

let Layout = require('./Layout');
let ddp = require('../config/ddp');

let LayoutContainer = React.createClass({
  displayName: 'LayoutContainer',

  getInitialState() {
    return {
      connected: false,
      loggedIn: false,
      userId: null
    }
  },

  componentWillMount() {
    ddp.initialize()
      .then(() => {
        return ddp.loginWithToken();
      })
      .then((res) => {
        let state = {
          connected: true,
          loggedIn: false
        };
        if (res.loggedIn === true) {
          state.loggedIn = true;
          state.userId= res.userId;
        }
        this.setState(state);
      });
  },

  changeLoginState(res) {
    if (!res.loggedIn) {
      ddp.logout();
    }
    this.setState(res);
  },

  addNewList(isPrivate) {
    ddp.call('Lists.insert', [isPrivate]);
  },

  render() {
    if (this.state.connected) {
      return (
        <Layout
          loggedIn={this.state.loggedIn}
          userId={this.state.userId}
          changeLogin={this.changeLoginState}
          addNewList={this.addNewList}
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

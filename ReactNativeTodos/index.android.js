import React, {
  AppRegistry,
  Component
} from 'react-native';

import Main from './app/components/main';

let ReactNativeTodos = React.createClass({
  render() {
    return (
      <Main />
    );
  }
});

AppRegistry.registerComponent('ReactNativeTodos', () => ReactNativeTodos);

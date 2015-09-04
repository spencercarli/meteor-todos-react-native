let React = require('react-native');
let {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Navigator,
} = React;

let ddp = require('../config/ddp');

let SignIn = React.createClass({
  getInitialState() {
    return {
      email: '',
      password: ''
    }
  },

  handleClick() {
    ddp.loginWithPassword(this.state.email, this.state.password)
      .then((loggedIn) => {
        this.props.changeLogin(loggedIn);
      });
  },

  handleJoinClick() {
    this.props.navigator.push({
      id: 'join',
      sceneConfig: Navigator.SceneConfigs.FloatFromRight
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sign In.</Text>
        <Text style={styles.subTitle}>Signing in allows you to view private lists</Text>

        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Your Email"
          placeholderTextColor="#AAA"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => this.setState({email: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#AAA"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={(text) => this.setState({password: text})}
        />

        <TouchableHighlight
          style={styles.btn}
          underlayColor="#28b1bd"
          onPress={this.handleClick}
        >
          <Text style={styles.btnText}>SIGN IN</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.joinBtn}
          underlayColor="#C8EAF3"
          onPress={this.handleJoinClick}
        >
          <Text style={styles.joinText}>Need an account? Join Now.</Text>
        </TouchableHighlight>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d2edf4',
    paddingHorizontal: 15
  },
  title: {
    color: '#1c3f53',
    fontSize: 48,
    fontWeight: "200"
  },
  subTitle: {
    color: '#666',
    marginBottom: 30,
    fontSize: 16,
    fontWeight: "400"
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    marginBottom: 1,
    paddingHorizontal: 15,
    color: '#333',
    fontSize: 16,
    fontWeight: "400"
  },
  btn: {
    backgroundColor: '#2cc5d2',
    paddingVertical: 15,
    marginTop: 30,
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  joinBtn: {
    padding: 10,
    marginTop: 10,
  },
  joinText: {
    color: '#AAA'
  }
});

module.exports = SignIn;

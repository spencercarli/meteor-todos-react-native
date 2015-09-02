let React = require('react-native');
let {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Navigator,
} = React;

let Join = React.createClass({
  getInitialState() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },

  handleClick() {
    console.log(this.state.email, this.state.password, this.state.confirmPassword);

    this.props.navigator.popToTop();
  },

  handleSignInClick() {
    this.props.navigator.pop();
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Join.</Text>
        <Text style={styles.subTitle}>Joining allows you to make private lists</Text>

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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#AAA"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={(text) => this.setState({confirmPassword: text})}
        />

        <TouchableHighlight
          style={styles.btn}
          underlayColor="#28b1bd"
          onPress={this.handleClick}
        >
          <Text style={styles.btnText}>JOIN NOW</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.signInBtn}
          underlayColor="#C8EAF3"
          onPress={this.handleSignInClick}
        >
          <Text style={styles.signInText}>Have an account? Sign in</Text>
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
  signInBtn: {
    padding: 10,
    marginTop: 10,
  },
  signInText: {
    color: '#AAA'
  }
});

module.exports = Join;

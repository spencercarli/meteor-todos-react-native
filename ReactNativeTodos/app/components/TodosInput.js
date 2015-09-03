let React = require('react-native');
let {
  View,
  Text,
  StyleSheet,
  TextInput,
  PixelRatio,
} = React;

let TodosInput = React.createClass({
  getInitialState() {
    return {
      text: ''
    }
  },

  handleSubmit() {
    if (this.state.text.length) {
      this.props.addTask(this.state.text);
      this.refs.input.setNativeProps({text: ''});
      this.setState({text: ''});
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          ref="input"
          style={styles.input}
          placeholder="Type to add new tasks"
          onChangeText={(text) => this.setState({text: text})}
          onSubmitEditing={this.handleSubmit}
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    borderColor: 'black',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  input: {
    height: 40,
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: '300',
  }
});

module.exports = TodosInput;

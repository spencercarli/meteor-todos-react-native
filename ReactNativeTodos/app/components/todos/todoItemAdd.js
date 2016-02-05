import React, {
  StyleSheet,
  View,
  TextInput,
  Image,
  PixelRatio
} from 'react-native';

import addIcon from '../../images/fa-plus-circle/fa-plus-circle.png';

import TodosDB from '../../config/db/todos';

export default React.createClass({
  // Configuration
  displayName: 'Todo Item Add',
  propTypes: {
    listId: React.PropTypes.string
  },

  // Initial State
  getInitialState() {
    return {
      task: ''
    }
  },

  // Event Handlers
  handleSubmit() {
    if (this.state.task.length) {
      TodosDB.addTodo(this.state.task, this.props.listId);
      this.setState({task: ''});
      this.refs.input.clear();
    }
  },

  // Component Render
  render() {
    return (
      <View>
        <View style={styles.row}>
          <Image
            source={addIcon}
            style={styles.icon}
            />
          <TextInput
            ref='input'
            style={styles.input}
            placeholder="Type to add new tasks"
            onSubmitEditing={this.handleSubmit}
            onChangeText={(task) => this.setState({task: task})}
            />
        </View>
        <View style={styles.border} />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  row: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    flex: 1,
    height: 20
  },
  icon: {
    marginRight: 10,
    tintColor: 'rgba(0, 0, 0, 0.25)'
  },
  border: {
    height: 1 / PixelRatio.get(),
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
});

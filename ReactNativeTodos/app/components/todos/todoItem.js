import React, {
  StyleSheet,
  View,
  Text,
  PixelRatio,
  Image,
  TouchableOpacity,
} from 'react-native';

import openSquare from '../../images/fa-square-o/fa-square-o.png';
import checkedSquare from '../../images/fa-check-square-o/fa-check-square-o.png';
import trash from '../../images/fa-trash-o/fa-trash-o.png';

import TodosDB from '../../config/db/todos';

export default React.createClass({
  // Configuration
  displayName: 'Todo Item',
  propTypes: {
    todo: React.PropTypes.object.isRequired
  },

  // Sub-render
  renderDelete() {
    let todo = this.props.todo;

    if (todo.checked) {
      let trashIcon = trash;
      return (
        <TouchableOpacity
          style={styles.rightIconContainer}
          onPress={() => TodosDB.deleteTodo(todo)}
        >
          <Image
            source={trashIcon}
            style={styles.rightIcon}
            />
        </TouchableOpacity>
      );
    }
  },

  renderAction() {
    let todo = this.props.todo;

    let actionIcon = openSquare;
    if (todo.checked) {
      actionIcon = checkedSquare;
    }

    return (
      <TouchableOpacity
        onPress={() => TodosDB.changeTodoState(todo, !todo.checked)}
      >
        <Image
          source={actionIcon}
          style={styles.leftIcon}
          />
      </TouchableOpacity>
    );
  },

  // Component Render
  render() {
    let todo = this.props.todo;

    let textStyle = [];
    if (todo.checked) {
      textStyle.push(styles.textChecked);
    }

    return (
      <View key={todo._id}>
        <View style={styles.row}>
          {this.renderAction()}

          <Text style={textStyle}>
            {todo.text}
          </Text>

          {this.renderDelete()}
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
    flex: 1
  },
  border: {
    height: 1 / PixelRatio.get(),
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  leftIcon: {
    marginRight: 10,
    tintColor: 'rgba(0, 0, 0, 0.25)'
  },
  rightIconContainer: {
    position: 'absolute',
    right: 15
  },
  rightIcon: {
    tintColor: 'rgba(0, 0, 0, 0.25)'
  },
  textChecked: {
    textDecorationLine: 'line-through'
  }
});

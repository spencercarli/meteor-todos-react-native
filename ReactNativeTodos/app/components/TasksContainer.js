let React = require('react-native');
let {
  View,
  Text
} = React;

let Tasks = require('./Tasks');

const STATIC_TASKS = [
  { _id: 1, text: 'Task 1', checked: true },
  { _id: 2, text: 'Task 2', checked: false },
  { _id: 3, text: 'Task 3', checked: true },
];

let TasksContainer = React.createClass({
  getInitialState() {
    return {
      tasks: STATIC_TASKS
    }
  },

  // Could be refactored
  _handleCheck(_id) {
    var newTasks = [];
    this.state.tasks.map((task) => {
      if (task._id === _id) {
        task.checked = !task.checked;
      }
      newTasks.push(task);
    });
    this.setState({tasks: newTasks})
  },

  render() {
    return <Tasks tasks={this.state.tasks} handleCheck={this._handleCheck} />;
  }
});

module.exports = TasksContainer;

let React = require('react-native');
let {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} = React;

let TasksContainer = require('./TasksContainer');
let chevronRight = require("image!chevron-right");

let Lists = React.createClass({
  propTypes: {
    lists: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      lists: []
    }
  },

  handleClick(list) {
    this.props.navigator.push({
      title: list.name,
      component: TasksContainer,
      passProps: {
        list: list
      }
    });
  },

  renderListRow(list) {
    return (
      <TouchableOpacity key={list.name} onPress={() => this.handleClick(list)}>
        <View style={styles.row}>
          <Text style={styles.listName}>{list.name}</Text>
          <Image style={styles.chevron} source={chevronRight} />
        </View>
      </TouchableOpacity>
    );
  },

  render() {
    let listItems = [];
    listItems = this.props.lists.map(this.renderListRow);

    return (
      <ScrollView style={styles.container}>
        {listItems}
      </ScrollView>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    padding: 15,
    borderBottomWidth: 1 / React.PixelRatio.get(),
    borderBottomColor: 'black',
    flexDirection: "row",
  },
  listName: {
    fontSize: 16,
    fontWeight: '300'
  },
  chevron: {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 15
  }
});

module.exports = Lists;

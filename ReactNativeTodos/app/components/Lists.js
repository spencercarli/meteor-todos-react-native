let React = require('react-native');
let {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} = React;

let TodosContainer = require('./TodosContainer');
let chevronRight = require("image!chevron-right");

let Lists = React.createClass({
  displayName: 'Lists',

  propTypes: {
    lists: React.PropTypes.array,
    navigator: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      lists: []
    }
  },

  handleClick(list) {
    this.props.navigator.push({
      title: list.name,
      component: TodosContainer,
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

  renderNoListsFound() {
    return (
      <View style={styles.row}>
        <Text style={styles.listName}>No Lists Found</Text>
      </View>
    );
  },

  render() {
    let listItems = [];
    if (this.props.lists.length) {
      listItems = this.props.lists.map(this.renderListRow);
    } else {
      listItems.push(this.renderNoListsFound());
    }

    return (
      <ScrollView style={styles.container}>
        {listItems}
      </ScrollView>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  row: {
    padding: 15,
    borderBottomWidth: 1 / React.PixelRatio.get(),
    borderBottomColor: '#d2edf4',
    flexDirection: "row",
  },
  listName: {
    fontSize: 16,
    fontWeight: "400",
    color: '#666'
  },
  chevron: {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 15
  }
});

module.exports = Lists;

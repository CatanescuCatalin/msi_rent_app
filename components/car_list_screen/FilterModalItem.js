import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({

    elementFilter: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingBottom: 15,
        marginBottom: 10
    },

    textItem: {
        fontSize: 20,
    }
});

export default class FilterModalItem extends Component {
  render() {
    return  this.props.items.child.map((items) => ( 
      <View key={items}>
      <View style={styles.elementFilter}>
          <TouchableOpacity onPress={() => this.props.addFilter(items, this.props.items)}>
              <Text style={styles.textItem}> > {items} </Text>
        </TouchableOpacity>
      </View>
    </View>
    ))
  }
}

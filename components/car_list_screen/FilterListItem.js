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

export default class FilterListItem extends Component {

  state = {
    filter: this.props.filter
  };


  render() {
    return (
      <View>

      </View>
    )
  }
}

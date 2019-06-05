import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


const styles = StyleSheet.create({

    container: {
      margin: 5,
      borderRadius: 20,
      backgroundColor: '#C4161C',
      width: 'auto',
      height: 40,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },  

    label: {
      marginLeft: 10,
      marginTop: 10,
      marginRight: 10,
      color: "white"
    },

    removeButton: {
      paddingTop: 10,
      marginRight: 5,
      alignItems: 'flex-end'
    }
});

export default class AppliedFilterItem extends Component {

  state ={
    filter: this.props.filter
  } 

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          {this.state.filter.label}
        </Text>

        <View style={styles.removeButton}> 
          <TouchableOpacity onPress={() => this.props.removeApliedFilter(this.state.filter)}>
            <Ionicons name="ios-close-circle" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

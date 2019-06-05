import React, { Component } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

const styles = StyleSheet.create({

  container:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    height:80

  },

  filterButton: {
      marginLeft: 15,
      marginTop: 20 
  },

  profileButton: {
    marginRight: 15,
    marginTop: 20
  }

});

export default class OptionsHeader extends Component {

  render() {
    return (
        <View style={styles.container}>
          
            <View style={styles.filterButton} >
              <TouchableOpacity  onPress={this.props.toggleModal}>
                <Ionicons name="ios-options" size={40} color="black" />
              </TouchableOpacity >
            </View>
           
          <View style={styles.profileButton} >
            <TouchableOpacity  onPress={()=> this.props.navigation.navigate("ProfileScreen") }>
              <Ionicons name="ios-person" size={40} color="black" />
            </TouchableOpacity>
          </View>
      </View>

          
    )
  }
}


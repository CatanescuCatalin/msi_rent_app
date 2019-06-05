import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import StatusBarBackground from './car_list_screen/StatusBarBackground';
import MapViewScreen from './MapViewScreen'

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

class ProfileScreen extends React.Component {
  render() {
    return (
      <View>
        <StatusBarBackground />
        
          <View style={styles.container}>
            
            <View style={styles.filterButton} >
              <TouchableOpacity  onPress={()=> {this.props.navigation.navigate("App"); }}>
                <Ionicons name="ios-options" size={40} color="black" />
              </TouchableOpacity >
            </View>
          
          <View style={styles.profileButton} >
            <TouchableOpacity  onPress={()=> this.props.navigation.navigate("ProfileScreen") }>
              <Ionicons name="ios-person" size={40} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{height: 100 + "%"}}>
          <MapViewScreen />
        </View>

      </View>
    );
  }
}

export default ProfileScreen;
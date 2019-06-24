import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import StatusBarBackground from "./car_list_screen/StatusBarBackground";
import URL_API from "../config";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 80
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
  state = {
    isLoading: true,
    hasCarReserved: false
  };

  async componentDidMount() {
    this._retrieveData();
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        await this._fetchUserInfo(JSON.parse(value).userName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  _fetchUserInfo = async userName => {
    fetch(URL_API + "/api/userinfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userName: userName
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({isLoading: false})
        if(responseJson.car){
          this.setState({hasCarReserved: true})
        }
        console.log(responseJson);
      }); 
  };

  render() {
    if (this.state.isLoading) {

      return (
        <View style={{flex: 1, justifyContent: "center"}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
      
    } else {
      return (
        <View>
          <StatusBarBackground />

          <View style={styles.container}>
            <View style={styles.filterButton}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("App");
                }}
              >
                <Ionicons name="ios-options" size={40} color="black" />
              </TouchableOpacity>
            </View>

            <View style={styles.profileButton}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("ProfileScreen")}
              >
                <Ionicons name="ios-person" size={40} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          { this.state.hasCarReserved ? 
            <View>
              <Text>Are Marisa</Text>
            </View> 
          : 
            <View>
              <Text>Nu ai nicio masina rezervata</Text>
            </View>
          }

        </View>
      );
    }
  }
}

export default ProfileScreen;

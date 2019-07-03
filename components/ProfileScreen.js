import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  AsyncStorage,
  ActivityIndicator,
  Image
} from "react-native";

import { Separator, Card, CardItem, Body, DeckSwiper } from "native-base";
import CalendarPicker from "react-native-calendar-picker";

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
  },

  moneyText: {
    fontSize: 30
  }
});

class ProfileScreen extends React.Component {
  state = {
    isLoading: true,
    hasCarReserved: false,
    car: {_id: 1},
    user: { TotalSpent: 0, selectedEndDate: 0, selectedStartDate: 0 }
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
        this.setState({ isLoading: false });
        if (responseJson.car) {
          this.setState({ hasCarReserved: true, car: responseJson.car });
        }

        this.setState({ user: responseJson.user[0] });
      });
  };

  render() {
    const minDate = new Date(this.state.user.selectedStartDate);
    const maxDate = new Date(this.state.user.selectedEndDate);


    var urlImageTitle = URL_API + "/" + this.state.car._id + "/";
    var auxCards = [
      {
        image: { uri: urlImageTitle + "1.jpg" }
      },

      {
        image: { uri: urlImageTitle + "2.jpg" }
      },

      {
        image: { uri: urlImageTitle + "3.jpg" }
      },

      {
        image: { uri: urlImageTitle + "4.jpg" }
      },

      {
        image: { uri: urlImageTitle + "5.jpg" }
      }
    ];


    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
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

          <Card>
            <CardItem>
              <Body>
                <Text style={styles.moneyText}>
                  Bani chetuiti: {this.state.user.TotalSpent}
                </Text>
              </Body>
            </CardItem>
          </Card>

          <Separator bordered > 
                <Text>Masina ta</Text>
          </Separator>

          {this.state.hasCarReserved ? (
            <View>
              <CalendarPicker
                startFromMonday={true}
                minDate={minDate}
                maxDate={maxDate}
                todayBackgroundColor="#f2e6ff"
                selectedDayColor="#7300e6"
                selectedDayTextColor="#FFFFFF"
              />

              <DeckSwiper
                dataSource={auxCards}
                renderItem={item => (
                  <Card style={{ elevation: 1 }}>
                    <CardItem cardBody>
                      <Image
                        style={{ height: 200, flex: 1 }}
                        source={item.image}
                      />
                    </CardItem>
                  </Card>
                )}
              />
            </View>
          ) : (
            <Card>
              <CardItem>
                <Body>
                  <Text style={styles.moneyText}>
                    Nu ai nicio masina rezervata
                  </Text>
                </Body>
              </CardItem>
            </Card>
          )}
        </View>
      );
    }
  }
}

export default ProfileScreen;

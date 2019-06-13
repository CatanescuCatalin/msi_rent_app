import React from "react";
import { Image, StyleSheet, Button, ActivityIndicator } from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {
  Container,
  Header,
  Content,
  Icon,
  Accordion,
  Text,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body
} from "native-base";

import URL_API from "../config";

import StatusBarBackground from './car_list_screen/StatusBarBackground'
import { ScrollView } from "react-native-gesture-handler";

class CarDetails extends React.Component {
  state = {
    loading: true,
    car:{},
  };

  async componentDidMount() {
    try {
      const { navigation } = this.props;
      const carId = navigation.getParam("carId");

      const carsApiCall = await fetch(URL_API + "/api/car/" + carId);
      const cars = await carsApiCall.json();
      this.setState({ car: cars, loading: false  });

    } catch (err) {
      console.log("Error fetching data-----------", err);
    }
  }

  render() {

      var urlImageTitle = URL_API + "/" + this.state.car.ImageUrl;
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

      console.log(auxCards);

    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <View>
        
          <StatusBarBackground/>

            <Button title="Back" onPress={() => this.props.navigation.navigate("App")} />
              <View style={{height: 200, borderBottomWidth: 1,  borderColor: "black"}}>

              <DeckSwiper
                dataSource={auxCards}
                renderItem={item => (
                <Card style={{ elevation: 1 }}>
                  <CardItem cardBody>
                    <Image style={{ height: 200, flex: 1 }} source={item.image} />
                  </CardItem>
                </Card>
                )}
              />

            </View>

            <Calendar />

            <Button title="Pay" onPress={() => this.props.navigation.navigate("Paylink")} />

          
        </View>
      );
    }
  }
}

export default CarDetails;


  

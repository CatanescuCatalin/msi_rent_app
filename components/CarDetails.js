import React from "react";
import { Image, StyleSheet, Button, ActivityIndicator, ScrollView } from "react-native";
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

class CarDetails extends React.Component {
  state = {
    loading: true,
    car:{},
    selected: ''
  };

  constructor(props) {
    super(props);
    this.onDayPress = this.onDayPress.bind(this);
  }

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

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }

  render() {

      var urlImageTitle = URL_API + "/" + this.state.car._id + '/';
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

    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <ScrollView>
        
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
              <Calendar 
                onDayPress={this.onDayPress}
                hideExtraDays
                showWeekNumbers
                markedDates={{[this.state.selected]: {selected: true}}}
               
              />

              <Button title="Pay" onPress={() => this.props.navigation.navigate("Paylink",{
                    car: this.state.car,
                    date: this.state.selected
              })} />
          
        </ScrollView>
      );
    }
  }
}

export default CarDetails;


  

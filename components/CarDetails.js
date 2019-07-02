import React from "react";
import {
  Image,
  StyleSheet,
  Button,
  ActivityIndicator,
  ScrollView
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
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
import MapViewScreen from "./MapViewScreen";

import URL_API from "../config";

import StatusBarBackground from "./car_list_screen/StatusBarBackground";

class CarDetails extends React.Component {
  state = {
    loading: true,
    car: {},
    selectedStartDate: null,
    selectedEndDate: null,
    payButtonDisable: true,
    numberOfDaysForRent: null,
    totalPrice: 0
  };

  constructor(props) {
    super(props);
    this.onDateChange = this.onDateChange.bind(this); 
  }

  async componentDidMount() {
    try {
      const { navigation } = this.props;
      const carId = navigation.getParam("carId");

      const carsApiCall = await fetch(URL_API + "/api/car/" + carId);
      const cars = await carsApiCall.json();
      this.setState({ car: cars, loading: false });
    } catch (err) {
      console.log("Error fetching data-----------", err);
    }
  }

  
  onDateChange(date, type) {
    if (type === "END_DATE") {
      this.setState({
        selectedEndDate: date,
        payButtonDisable: false
      }, () => {
        firstDay = new Date(this.state.selectedStartDate).getTime();
        lastDay = new Date(this.state.selectedEndDate).getTime();
        numberOfDays = this.days_between(firstDay, lastDay);
        this.setState({numberOfDaysForRent: numberOfDays});
        tP = numberOfDays * this.state.car.Price; 
        this.setState({totalPrice: tP});
      });
      
    } else {
      this.setState({
        selectedStartDate: date,
        selectedEndDate: null,
        payButtonDisable: true
      });
    }
  }

  days_between = (date1, date2) => {

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1 - date2);

    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY) + 1;
  }

  render() {
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date(); // Today
    const maxDate = new Date(2019, 12, 12);
    const startDate = selectedStartDate ? selectedStartDate.toString() : "";
    const endDate = selectedEndDate ? selectedEndDate.toString() : "";

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

    if (this.state.loading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <ScrollView>
          <StatusBarBackground />

          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ width: 50 + "%" }}>
              <Button
                title="Back" 
                color="black"
                onPress={() => this.props.navigation.navigate("App")}
              />
            </View>

            <View style={{ width: 50 + "%" }}>
              <Button
                title={"Pay " + this.state.totalPrice + " $"}
                disabled={this.state.payButtonDisable}
                onPress={() =>
                  this.props.navigation.navigate("Paylink", {
                    car: this.state.car,
                    selectedStartDate: this.state.selectedStartDate,
                    selectedEndDate: this.state.selectedEndDate
                  })
                }
              />
            </View>
          </View>

          <View
            style={{ height: 200, borderBottomWidth: 1, borderColor: "black" }}
          >
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

          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            minDate={minDate}
            maxDate={maxDate}
            todayBackgroundColor="#f2e6ff"
            selectedDayColor="#7300e6"
            selectedDayTextColor="#FFFFFF"
            onDateChange={this.onDateChange}
          />
          
          <View style={{ height: 250 }}>
            <MapViewScreen car={this.state.car}/>
          </View>
        </ScrollView>
      );
    }
  }
}

export default CarDetails;

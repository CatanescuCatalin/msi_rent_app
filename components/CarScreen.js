import React from "react";
import { Text, View, ScrollView, StyleSheet, Button } from "react-native";
import ListItemCar from "./ListItemCar";
import URL_API from "../config";

class CarScreen extends React.Component {
  state = {
    carList: [],
    loading: true
  };

  async componentDidMount() {
    try {
      const carsApiCall = await fetch(URL_API + "/api/cars");
      const cars = await carsApiCall.json();
      this.setState({ carList: cars.results, loading: false });
    } catch (err) {
      console.log("Error fetching data-----------", err)
    }
  }

  render() {
    return (
      <View>
        <ScrollView>
          <ListItemCar
            navigation={this.props.navigation}
            carList={this.state.carList}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 10
  }
});

export default CarScreen;

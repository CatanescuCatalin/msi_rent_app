import React, { Component } from "react";
import { Container, Accordion } from "native-base";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Icon,
  ActivityIndicator,
  ScrollView
} from "react-native";
import StatusBarBackground from "./StatusBarBackground";
import OptionsHeader from "./OptionsHeader";
import AppliedFilters from "./AppliedFilters";
import Modal from "react-native-modal";
import _ from "lodash";
import URL_API from "../../config";

export default class CarListScreen extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isModalFilterListVisible: false,
    isModalFilterItemVisible: false,
    subFilterItem: [],
    filterList: [
      {
        label: "Brand",
        child: ["BMW", "Mercedes Benz"]
      },
      {
        label: "Combustibil",
        child: ["Motorina", "Benzina"]
      },
      {
        label: "Volum",
        child: ["100", "200", "300"]
      },
      {
        label: "Numar de locuri",
        child: ["4", "5", "8"]
      },
      {
        label: "Cutie de viteze",
        child: ["Automata", "Manuala"]
      }
    ],

    appliedFiltersList: [],
    filteredCars: [],

    carList: [],
    loading: true
  };

  async componentDidMount() {
    try {
      const carsApiCall = await fetch(URL_API + "/api/cars");
      const cars = await carsApiCall.json();
      this.setState({ carList: cars, loading: false });
      this.setState({ filteredCars: cars });
    } catch (err) {
      console.log("Error fetching data-----------", err);
    }
  }

  _toggleModalFilterList = () => {
    this.setState({
      isModalFilterListVisible: !this.state.isModalFilterListVisible
    });
  };

  _onPressProfileButton() {
    console.log("profile");
  }

  _addFilters = child => {
    var arr = this.state.appliedFiltersList;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].label === child) {
        arr.splice(i, 1);
      }
    }

    if (arr.length === 0) {
      var joined = this.state.appliedFiltersList.concat({ label: child });
      this.setState({ appliedFiltersList: joined }, () => {
        this._filterCars();
      });
    } else {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].label !== child) {
          var joined = this.state.appliedFiltersList.concat({ label: child });
          this.setState({ appliedFiltersList: joined }, () => {
            this._filterCars();
          });
        }
      }
    }
  };

  _renderModalFilterListContent = () => (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.headerModal}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity onPress={this._toggleModalFilterList}>
            <Text style={{ fontSize: 30 }}>X</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: 30, marginLeft: 15, marginTop: 10 }}>
            Aplica Filtre
          </Text>
        </View>
        <View
          style={{
            padding: 12,
            borderWidth: 1,
            borderColor: "#C4161C",
            borderRadius: 20,
            marginTop: 5,
            marginRight: 10
          }}
        >
          <TouchableOpacity onPress={this._removeFilters}>
            <Text style={{ color: "#C4161C" }}>Sterge Filtre</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        {this.state.filterList.map(filter => {
          return (
            <View key={filter.label} style={styles.titleFilterContainer}>
              <Text style={{ fontSize: 25 }}>{filter.label}</Text>
              <View>
                {filter.child.map(child => {
                  return (
                    <View key={child} style={{ marginLeft: 10 }}>
                      <TouchableOpacity onPress={() => this._addFilters(child)}>
                        <Text style={{ fontSize: 20 }}>{child}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );

  _removeFilters = () => {
    this.setState({appliedFiltersList: []});
    this._toggleModalFilterList();
  };

  _removeApliedFilter = filter => {
    var arr = this.state.appliedFiltersList;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].label === filter) {
        arr.splice(i, 1);
      }
    }

    this.setState({ appliedFiltersList: arr }, () => {
      this._filterCars();
    });
  };

  _filterCars = () => {
    var arrApliedFilters = this.state.appliedFiltersList;
    var arrCarList = this.state.carList;
    var filteredCarsAux = []

    for (var ic = 0; ic < arrCarList.length; ic++) {
      for (var iAF = 0; iAF < arrApliedFilters.length; iAF++) {
        Object.values(arrCarList[ic]).forEach(value => {
          if (value === arrApliedFilters[iAF].label) {
            filteredCarsAux.push(arrCarList[ic]);
          }
        });
      }
    }

    if (arrApliedFilters.length === 0){
      this.setState({filteredCars: this.state.carList})
    } else {
      this.setState({filteredCars: filteredCarsAux})
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return (
        <Container>
          <StatusBarBackground />
          <OptionsHeader
            toggleModal={this._toggleModalFilterList}
            navigation={this.props.navigation}
          />
          <AppliedFilters
            navigation={this.props.navigation}
            appliedFiltersList={this.state.appliedFiltersList}
            carList={this.state.filteredCars}
            removeApliedFilter={this._removeApliedFilter}
          />
          <Modal isVisible={this.state.isModalFilterListVisible}>
            {this._renderModalFilterListContent()}
          </Modal>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },

  headerModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingBottom: 15,
    marginBottom: 10
  },

  titleFilterContainer: {
    margin: 15,
    marginTop: 5,
    borderWidth: 1,
    borderColor: "black"
  }
});

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
        child: ["BWM", "Mercedes"]
      },
      {
        label: "Combustibil",
        child: ["Motorina", "Benzina"]
      },
      {
        label: "Volum",
        child: ["Volum: 100", "Volum: 200", "Volum: 300"]
      },
      {
        label: "Numar de locuri",
        child: ["Numar locuri: 4", "Numar locuri: 5", "Numar locuri: 8"]
      },
      {
        label: "Cutie de viteze",
        child: ["Automata", "Manuala"]
      },
      {
        label: "Pachet",
        child: ["Green", "Red", "Black"]
      }
    ],

    appliedFiltersList: [],

    carList: [],
    loading: true
  };

  async componentDidMount() {
    try {
      const carsApiCall = await fetch(URL_API + "/api/cars");
      const cars = await carsApiCall.json();
      this.setState({ carList: cars, loading: false });
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

  _addFilters = (child) => { 
    var joined = this.state.appliedFiltersList.concat({ label: child });
    this.setState({ appliedFiltersList: joined });
  };

  _renderModalFilterListContent = () => (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.headerModal}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity onPress={this._toggleModalFilterList}>
            <Text style={{ fontSize: 25 }}>X</Text>
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
          <Text style={{ color: "#C4161C" }}>Sterge Filtre</Text>
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

  _removeApliedFilter = filter => {
    var temp_array = _.remove(this.state.appliedFiltersList, function(
      myfilter
    ) {
      return filter.label == myfilter.label;
    });

    this.setState({ appliedFiltersList: temp_array });
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
            carList={this.state.carList}
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

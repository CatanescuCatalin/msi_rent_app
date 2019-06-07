import React, { Component } from 'react';
import { Container } from 'native-base';
import { StyleSheet, View, TouchableOpacity, Text, Icon, ActivityIndicator } from 'react-native';
import StatusBarBackground from './StatusBarBackground';
import OptionsHeader from './OptionsHeader';
import AppliedFilters from './AppliedFilters';
import Modal from "react-native-modal";
import FilterList from "./FilterList"
import { AntDesign } from '@expo/vector-icons';
import FilterModalItem from './FilterModalItem';
import _ from 'lodash';
import URL_API from "../../config";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },

  headerModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1, 
    borderBottomColor: 'black',
    paddingBottom: 15,
    marginBottom: 10
  },
  
});

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
        label: 'Brand',
        child: [
          'BWM',
          'Mercedes'
        ]
      }, {
        label: 'Combustibil',
        child: [
          'Motorina',
          'Benzina'
        ]
      }, {
        label: 'Volum',
        child: [
          'Volum: 100',
          'Volum: 200',
          'Volum: 300'
        ]
      }, {
        label: 'Numar de locuri',
        child: [
          'Numar locuri: 4',
          'Numar locuri: 5',
          'Numar locuri: 8'
        ]
      }, {
        label: 'Cutie de viteze',
        child: [
          'Automata',
          'Manuala'
        ]
      }, {
        label: 'Pachet',
        child: [
          'Green',
          'Red',
          'Black'
        ]
      }
    ],

    appliedFiltersList: [],

    carList: [],
    loading: true
  };

  async componentDidMount() {
    try {
        const carsApiCall = await fetch(URL_API + '/api/cars');
        const cars = await carsApiCall.json();
        this.setState({carList: cars, loading: false});
    } catch(err) {
        console.log("Error fetching data-----------", err);
      }
  }

  _toggleModalFilterList = () => {
    this.setState({ isModalFilterListVisible: !this.state.isModalFilterListVisible });
  }

  _onPressProfileButton(){
    console.log("profile");
  }

  _addFilters = (child, item) =>{
    var joined = this.state.appliedFiltersList.concat({label: child});
    this.setState({ appliedFiltersList: joined })
    this._toggleModalFilterItem();
  }

  _renderModalFilterListContent= () => (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.headerModal} >
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity onPress={this._toggleModalFilterList}>
            <AntDesign name="closecircleo" size={40} style={{marginLeft: 10, marginTop: 10}} color="black" />
          </TouchableOpacity>
          <Text style={{fontSize: 30, marginLeft: 15, marginTop: 10}}>Aplica Filtre</Text>
        </View>
        <View style={{padding: 12, borderWidth: 1, borderColor: '#C4161C', borderRadius: 20, marginTop: 5, marginRight: 10}}>
          <Text style={{color: "#C4161C"}}>Sterge Filtre</Text>
        </View>
      </View>
      <FilterList openModalFilterItem={this._openModalFilterItem} filterList={this.state.filterList}/>
    </View> 
  );

  _toggleModalFilterItem = () => {
    this.setState({ isModalFilterItemVisible: !this.state.isModalFilterItemVisible });
  }

  _openModalFilterItem = (subItem) => {
    this.setState({ isModalFilterItemVisible: true });
    this.setState({ subFilterItem: subItem });
  }

  _renderModalFilterItemContent= () => (
    <View style={{ flex: 1, backgroundColor: "white"}}>
      <TouchableOpacity onPress={this._toggleModalFilterItem}>
        <AntDesign name="closecircleo" size={40} style={{marginLeft: 10, marginTop: 10}} color="black" />
      </TouchableOpacity>
      <FilterModalItem items={this.state.subFilterItem} addFilter={this._addFilters}/>
    </View>
  );

  _removeApliedFilter = (filter)=>{
    var temp_array = _.remove(this.state.appliedFiltersList, function(myfilter) {
      return filter.label == myfilter.label;
    });

    this.setState({ appliedFiltersList: temp_array });
  }

  render() {
    if(this.state.loading){
      return(
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }else{
      return (
        <Container>
          <StatusBarBackground />
          <OptionsHeader toggleModal={this._toggleModalFilterList} navigation={this.props.navigation}/>
          <AppliedFilters navigation={this.props.navigation}
            appliedFiltersList={this.state.appliedFiltersList}
            carList={this.state.carList}
            removeApliedFilter={this._removeApliedFilter}
           />
          <Modal isVisible={this.state.isModalFilterListVisible}>
            {this._renderModalFilterListContent()}
          </Modal>
  
          <Modal isVisible={this.state.isModalFilterItemVisible}>
            {this._renderModalFilterItemContent()}
          </Modal>
  
        </Container>
      )
    }
  }
}
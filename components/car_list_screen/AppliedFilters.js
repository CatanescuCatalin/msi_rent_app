import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView  } from 'react-native'
import {  Container, Content } from 'native-base';
import AppliedFilterslist from "./AppliedFiltersList";
import CarList from './CarList'

const styles = StyleSheet.create({

    container:{
        flexDirection: 'column',
    },
      
    containerText:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 20,
    }, 

    filterAppliedLabel: {
        marginLeft: 15,
        marginTop: 0
    },

    resultsFilters: {
      marginRight: 15,
      marginTop: 0
  },

    filterListStyle: {
        height: 50
        
    }
});

export default class AppliedFilters extends Component {

    state = {
        appliedFiltersList : this.props.appliedFiltersList
    }

    componentWillReceiveProps() {
        this.setState({appliedFiltersList: this.props.appliedFiltersList})
      }

  render() {
    return (
        <Container style={styles.container}>
            <View style={styles.containerText}>
                <Text style={styles.filterAppliedLabel}>Filtre Aplicate: {this.state.appliedFiltersList.length}</Text>
                <Text style={styles.resultsFilters}>Rezultate Obtinute: *to be</Text>
            </View>

            <View style={styles.filterListStyle}>
                <ScrollView  horizontal={true} >
                    <AppliedFilterslist  
                        removeApliedFilter={this.props.removeApliedFilter}
                        filterList={this.state.appliedFiltersList} />
                </ScrollView>
            </View>
            <CarList carList={this.props.carList}/>
        </Container>
    )
  }
}

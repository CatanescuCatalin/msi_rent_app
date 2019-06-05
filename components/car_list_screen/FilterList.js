import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import FilterListItem from './FilterListItem';

const styles = StyleSheet.create({

    elementFilter: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingBottom: 15,
        marginBottom: 10
    }
});

export default class FilterList extends Component {

  state = {
    filterList: this.props.filterList
  };

  render() {
    return this.state.filterList.map(
      (filter) => (
          <FilterListItem key={filter.label} filter={filter} openModalFilterItem={this.props.openModalFilterItem}/>
      )) 
  }
}

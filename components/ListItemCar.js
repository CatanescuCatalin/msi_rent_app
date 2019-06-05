import React from 'react';
import { Text, View, Button } from 'react-native';
import CarItem from './CarItem';

class ListItemCar extends React.Component {
  render() {
    return this.props.carList.map(
        (car) => (
            <CarItem navigation={this.props.navigation} key={car.id} car={car}/>
        ) 
    );
  }
}


export default ListItemCar;
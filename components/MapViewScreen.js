import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MapView } from 'expo';
let Marker = MapView.Marker;
export default class MapViewScreen extends Component {

  render() {
    return (
        <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 44.319929,
          longitude: 23.802197,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        >

        <Marker
          coordinate={{latitude: parseFloat(this.props.car.Ncoordonate, 10),
            longitude: parseFloat(this.props.car.Ecoordonate, 10)}}
            title={this.props.car.Maker + " " + this.props.car.Model}
        />

        </MapView>
    );
  }
}

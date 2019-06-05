import React from 'react';
import {Text, View, ScrollView, StyleSheet, Button} from 'react-native';
import StatusBarBackground from './car_list_screen/StatusBarBackground';
import ListItemCar from './ListItemCar';


class CarScreen extends React.Component {

  state = {
    carList: [
      {
        id: 1,
        marca: 'audi',
        model: 'a6',
        combustibil: 'diesel',
        km: '100', 
        url: 'https://www.autoscout24.ro/assets/auto/images/model/audi/audi-a6/audi-a6-l-01.jpg'
      },
      {
        id: 2,
        marca: 'audi',
        model: 'a6',
        combustibil: 'diesel',
        km: '100', 
        url: 'https://www.autoscout24.ro/assets/auto/images/model/audi/audi-a6/audi-a6-l-01.jpg'
      },
      {
        id: 3,
        marca: 'audi',
        model: 'a6',
        combustibil: 'diesel',
        km: '100', 
        url: 'https://www.autoscout24.ro/assets/auto/images/model/audi/audi-a6/audi-a6-l-01.jpg'
      },
      {
        id: 4,
        marca: 'audi',
        model: 'a6',
        combustibil: 'diesel',
        km: '100', 
        url: 'https://www.autoscout24.ro/assets/auto/images/model/audi/audi-a6/audi-a6-l-01.jpg'
      },
      {
        id: 5,
        marca: 'audi',
        model: 'a6',
        combustibil: 'diesel',
        km: '100', 
        url: 'https://www.autoscout24.ro/assets/auto/images/model/audi/audi-a6/audi-a6-l-01.jpg'
      },
      {
        id: 6,
        marca: 'audi',
        model: 'a6',
        combustibil: 'diesel',
        km: '100', 
        url: 'https://www.autoscout24.ro/assets/auto/images/model/audi/audi-a6/audi-a6-l-01.jpg'
      },
      {
        id: 7,
        marca: 'audi',
        model: 'a6',
        combustibil: 'diesel',
        km: '100', 
        url: 'https://www.autoscout24.ro/assets/auto/images/model/audi/audi-a6/audi-a6-l-01.jpg'
      },
      {
        id: 8,
        marca: 'audi',
        model: 'a6',
        combustibil: 'diesel',
        km: '100', 
        url: 'https://www.autoscout24.ro/assets/auto/images/model/audi/audi-a6/audi-a6-l-01.jpg'
      },
      {
        id: 9,
        marca: 'audi',
        model: 'a6',
        combustibil: 'diesel',
        km: '100', 
        url: 'https://www.autoscout24.ro/assets/auto/images/model/audi/audi-a6/audi-a6-l-01.jpg'
      },
      {
        id: 10,
        marca: 'audi',
        model: 'a6',
        combustibil: 'diesel',
        km: '100', 
        url: 'https://www.autoscout24.ro/assets/auto/images/model/audi/audi-a6/audi-a6-l-01.jpg'
      },
      {
        id: 11,
        marca: 'audi',
        model: 'a6',
        combustibil: 'diesel',
        km: '100', 
        url: 'https://www.autoscout24.ro/assets/auto/images/model/audi/audi-a6/audi-a6-l-01.jpg'
      }
    ]
  }

  

  render() {
    return (
      <View>
        <ScrollView>
          <ListItemCar navigation={this.props.navigation} carList={this.state.carList}/>  
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 10
  },

});


export default CarScreen;
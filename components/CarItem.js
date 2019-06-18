import React from 'react';
import URL_API from "../config";
import { Text, View, Image, StyleSheet, Button } from 'react-native';

class ListItemCar extends React.Component {

    render() {
        const car = this.props.car;
        url = `${URL_API}/${car.id}/1.jpg`
        return (
            <View style={styles.container}>
                <Image style={styles.imageStyle} source={{ uri: url }}
                />
                <View style={styles.container1}>
                    <Text>Marcaaa: {car.marca}</Text>
                    <Text>Model: {car.model}</Text>
                </View>

                <View style={styles.container1} >
                    <Text>Combustibil: {car.combustibil}</Text>
                    <Text>Km: {car.km}</Text>
                </View>

                <Button title="Details" onPress={() => this.props.navigation.navigate("CarDetails",{
                    carId: car.id,
                })} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        width: 50,
        height: 50
    },

    container: {
        margin: 3,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#bac8e0'

    },

    container1: {
        flex: 1,
        flexDirection: 'column'
    }
});

export default ListItemCar;
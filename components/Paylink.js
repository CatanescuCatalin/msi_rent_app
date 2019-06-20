import React, { Component } from 'react'
import { Text, View, ScrollView, AsyncStorage } from 'react-native'
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import {Button} from "react-native";
import StatusBarBackground from './car_list_screen/StatusBarBackground'
import URL_API from '../config'

export default class Paylink extends Component {

    state = {
        car: {},
        date: ''
    }

    _onChange = form => console.log(form);
    
    componentDidMount() {
        const { navigation } = this.props;
        const carPar = navigation.getParam("car");
        const datePar = navigation.getParam("date");

        this.setState({ car: carPar, date: datePar })

    }

    _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('user');
          if (value !== null) {
            return value
          }
        } catch (error) {
          console.log(error)
        }
      };

    _clickBuy = async () => {

        user = await this._retrieveData()

        fetch(URL_API + "/api/reservCar/" + this.state.car._id, {
            method: "PUT",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                user: user

            })
          }).then(response => {
            if(response.ok){

                this.props.navigation.navigate("App");
            }
          })
    }

    render() {
        return (
            <View>
                <StatusBarBackground/>

                <Button title="Back" onPress={() => this.props.navigation.navigate("App")} />
                <CreditCardInput 
                autoFocus

                onChange={this._onChange}
                 />

                <Button title="Submit" onPress={() => this._clickBuy()}/>
            </View>
        )
    }
}


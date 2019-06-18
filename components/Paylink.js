import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import {Button} from "react-native";
import StatusBarBackground from './car_list_screen/StatusBarBackground'

export default class Paylink extends Component {
    _onChange = form => console.log(form);
    
    componentDidMount() {
        const { navigation } = this.props;
        const car = navigation.getParam("car");
        const date = navigation.getParam("date");

        console.log(car, date);
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

                <Button title="Submit" onPress={() => this.props.navigation.navigate("App")}/>
            </View>
        )
    }
}


import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import {Button} from "react-native";
import StatusBarBackground from './car_list_screen/StatusBarBackground'

export default class Paylink extends Component {
    _onChange = form => console.log(form);
    

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


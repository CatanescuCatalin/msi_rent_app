import React from "react";
import { Text, View, Button, StyleSheet, AsyncStorage, ActivityIndicator } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label
} from "native-base";

import URL_API from"../config";

import StatusBarBackground from "./car_list_screen/StatusBarBackground";

class AuthenticationScreen extends React.Component {
  state = {
    username: "",
    password: "",
    wrongUserAnsPass: false,
    canLogIn: false,
    savingUser: false
  };

  _logInChengeScreen = () => {

    this._getUserAnPass();
    
  };

  _getUserAnPass = () => {
    return fetch(URL_API + "/api/login", {
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        userName: this.state.username,
        password: this.state.password
      })
    }).then(response => {
      if(response.ok){
        this.setState({canLogIn: true})
        if(this.state.canLogIn){
          //this.props.navigation.navigate("App");
          this.setState({savingUser: true})
         
          this._storeData()
        }
      }else{
        this.setState({wrongUserAnsPass: true})
      }
    })
  };

  _storeData = async () => {
    try {
      userName = this.state.username
      password = this.state.password
      await AsyncStorage.setItem('user', JSON.stringify({ userName, password }));
      this.props.navigation.navigate("App");
    } catch (error) {
      console.log(error)
    }
  }

  _registerChengeScreen = () => {
    this.props.navigation.navigate("RegisterScreen");
  
  };

  render() {
    if (this.state.savingUser){
     return(
      <View>
        <ActivityIndicator size="large" color="#0000ff" /> 
      </View>
     )
    } else {
      return (
        <Container>
          <StatusBarBackground />
          <Content>
            {this.state.wrongUserAnsPass ? <Text>Wrong User or Password</Text> : <Text></Text>}
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input onChangeText={username => {this.setState({ username, wrongUserAnsPass: false })}} />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input onChangeText={password => this.setState({ password })} />
              </Item>
            </Form>
            <View style={styles.buttonLogINContainer}>
              <Button title="Log in" onPress={this._logInChengeScreen} />
            </View>
  
            <View style={styles.buttonLogINContainer}>
              <Button title="Register" onPress={this._registerChengeScreen} />
            </View>
          </Content>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonLogINContainer: {
    padding: 15
  }
});

export default AuthenticationScreen;

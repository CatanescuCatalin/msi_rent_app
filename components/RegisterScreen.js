import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import StatusBarBackground from './car_list_screen/StatusBarBackground'
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

export default class RegisterScreen extends Component {

    state = {username:"" , password:"", email:""
    };

  constructor(props) {
    super(props);

  }

  _logInChengeScreen = () => {
    fetch(URL_API + "/api/register", {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          userName: this.state.username,
          password: this.state.password,
          email: this.state.email
        })
      }).then(response => {
        if(response.ok){
            this.props.navigation.navigate("AuthenticationScreen");
        }else{
          this.setState({wrongUserAnsPass: true})
        }
      })
  }

  render() {
    return(
    <Container>
        <StatusBarBackground />
        <Content>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input onChangeText={username => {this.setState({ username })}} />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input onChangeText={password => this.setState({ password })} />
            </Item>
            <Item floatingLabel last>
              <Label>Email</Label>
              <Input onChangeText={email => this.setState({ email })} />
            </Item>
          </Form>
          <View>
            <Button title="Register" onPress={this._logInChengeScreen} />
          </View>

        
        </Content>
      </Container>
    );
  }
}

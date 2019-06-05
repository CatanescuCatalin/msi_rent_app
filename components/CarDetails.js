import React from 'react';
import {  Container, Header, Content, Form, Item, Input, Label } from 'native-base';

class CarDetails extends React.Component {
    render() {
    const { navigation } = this.props;
    const carId = navigation.getParam('carId');
        return (
            <Container>
            <Content>
            <Label>{carId}</Label>
              <Form>
                <Item floatingLabel>
                  <Label>Username</Label>
                  <Input />
                </Item>
                <Item floatingLabel last>
                  <Label>Password</Label>
                  <Input />
                </Item>
              </Form>
            </Content>
          </Container>

        );
    }
}

export default CarDetails;
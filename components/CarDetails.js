import React from "react";
import { Image, StyleSheet, Button } from "react-native";
import {
  Container,
  Header,
  Content,
  Icon,
  Accordion,
  Text,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Left,
  Body
} from "native-base";

import URL_API from "../config";

class CarDetails extends React.Component {
  render() {

    const { navigation } = this.props;
    const carId = navigation.getParam("carId");

    var urlImageTitle = URL_API + "/" + carId.ImageUrl;
    var cards = [
      {
        image: { uri: urlImageTitle + "1.jpg" }
      },

      {
        image: { uri: urlImageTitle + "2.jpg" }
      }
    ];

    return (
      <View>
        <DeckSwiper
          dataSource={cards}
          renderItem={item => (
            <Card style={{ elevation: 1 }}>
              <CardItem cardBody>
                <Image style={{ height: 300, flex: 1 }} source={item.image} />
              </CardItem>
            </Card>
          )}
        />
      </View>
    );
  }
}

export default CarDetails;

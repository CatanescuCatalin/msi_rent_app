import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Header, Content, Icon, Accordion, Text, View } from "native-base";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const styles = StyleSheet.create({
  
  titleContainerExpanded: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    backgroundColor: "#1D2228",
    borderBottomWidth: 2,
    marginBottom: 30,
    borderBottomColor: '#1D2228',
  },

  titleContainerColapsed: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    backgroundColor: "#1D2228",
    borderBottomWidth: 2,
    marginBottom: 30,
    borderBottomColor: 'black',
  },

  imageTitle: {
    width: 75, 
    height: 75, 
    borderRadius: 40
  },

  iconTitle: {
    fontSize: 45, 
    color: 'white',
  },

  textTitle: {
    color: 'white'
  },

  itemDetail:{
    flexDirection: "row",
    borderBottomWidth: 1,
    marginBottom: 15,
    borderBottomColor: 'white'
  },

  textItem:{
    color: "white",
    marginBottom: 5
  },

  containerDetailCart: {
    marginLeft: 20,
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },  

});

export default class CarList extends Component {

  _renderHeader(item, expanded) {
    return (
      <View style={expanded ? styles.titleContainerExpanded  : styles.titleContainerColapsed }> 

        <Image style={styles.imageTitle} source={{uri: item.url}}/>
        
        <View>
          <Text style={styles.textTitle}>{item.title}</Text>
          <Text style={styles.textTitle}>Pachet: {item.pachet}</Text>
        </View>

        {expanded ? <Icon style={styles.iconTitle} name="remove-circle" />  : <Icon style={styles.iconTitle} name="add-circle" />}
        
      </View>
    );
  }
      
  _renderContent(item) {
    return (
      <View style={styles.containerDetailCart}>
        
        <View style={styles.itemDetail}>
          <MaterialIcons name="local-gas-station" size={40} color="white" />
          <Text style={styles.textItem}>---</Text>
          <Text style={styles.textItem}>Bezina</Text>
        </View>  
      
        <View style={styles.itemDetail}>
          <MaterialCommunityIcons name="package" size={40} color="white" />
          <Text style={styles.textItem}>---</Text>
          <Text style={styles.textItem}>400 L</Text>
        </View> 
        
        <View style={styles.itemDetail}>
          <MaterialIcons name="people" size={40} color="white" />
          <Text style={styles.textItem}>---</Text>
          <Text style={styles.textItem}>5 locuri</Text>
        </View> 
      
        <View style={styles.itemDetail}>
          <EvilIcons name="gear" size={40} color="white" />
          <Text style={styles.textItem}>---</Text>
          <Text style={styles.textItem}>Automata</Text>
        </View> 
        
        <View style={styles.itemDetail}>
          <Entypo name="drop" size={40} color="white" />
          <Text style={styles.textItem}>---</Text>
          <Text style={styles.textItem}>Alb</Text>
        </View> 

      </View>
    );
  }

  render() {
    return (
      <Container>
        <Accordion style={{backgroundColor: "#1D2228"}}
          dataArray={this.props.carList}
          animation={false}
          expanded={true}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        />
      </Container>
    );
  }
}

import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import { Constants } from 'expo';

class StatusBarBackground extends Component{
  render(){
    return(
      <View style={styles.statusBar} />
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "black",
    height: Constants.statusBarHeight,
  },
})

export default StatusBarBackground;

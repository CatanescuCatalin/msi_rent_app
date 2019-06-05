import React from 'react';
import { Text, View, Button } from 'react-native';

//Screen for auto log in, needs to read from memory the tocken and redirect to App screen
class AuthLoadingScreen extends React.Component {
    render() {
      return (
        <View>
          <Text>AuthLoadingScreen</Text>
        </View>
      )
    }
  }

export default AuthLoadingScreen
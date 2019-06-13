import React from 'react';
import { createBottomTabNavigator, createAppContainer,  createStackNavigator, createSwitchNavigator} from 'react-navigation';
import CarScreen from './components/CarScreen';
import ProfileScreen from './components/ProfileScreen';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import CarDetails from "./components/CarDetails";
import AuthenticationScreen from './components/AuthenticationScreen'
import CarListScreen from'./components/car_list_screen/CarListScreen'
import RegisterScreen from './components/RegisterScreen'
import Paylink from './components/Paylink'


const CarDetailsStack = createStackNavigator({
  Cars: {
    screen: CarScreen,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle:"Cars"
      }
    }
  },

  CarDetails: {
    screen: CarDetails
  }
});

const TabNavigator = createBottomTabNavigator({
  Cars: { screen: CarDetailsStack,
    navigationOptions: {
      tabBarLabel: 'Cars',
      tabBarIcon : ({tintColor}) => (
        <Ionicons name="ios-car" size={25}/>
      )
    }
  },

  Profile: { screen: ProfileScreen, 
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon : ({tintColor}) => (
        <FontAwesome name="user" size={24}/>
      )
    }
  },
});

const switchNavigator = createSwitchNavigator(
  {  
    //Main App tabNavigator
    App: CarListScreen,
    
    //Screen for introducing user and pass 
    AuthenticationScreen: AuthenticationScreen,
    
    ProfileScreen: ProfileScreen, 

    RegisterScreen: RegisterScreen,

    CarDetails: CarDetails,

    Paylink : Paylink
  },
  {
    initialRouteName: 'AuthenticationScreen', 
  }
);

const AppContainer = createAppContainer(switchNavigator);

export default class App extends React.Component {
  
  render() {
    return <AppContainer />
  }
}
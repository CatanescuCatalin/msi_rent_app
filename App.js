import React from 'react';
import { createAppContainer,  createSwitchNavigator} from 'react-navigation';
import ProfileScreen from './components/ProfileScreen';
import CarDetails from "./components/CarDetails";
import AuthenticationScreen from './components/AuthenticationScreen'
import CarListScreen from'./components/car_list_screen/CarListScreen'
import RegisterScreen from './components/RegisterScreen'
import Paylink from './components/Paylink'

const switchNavigator = createSwitchNavigator(
  {  
    App: CarListScreen,
    
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
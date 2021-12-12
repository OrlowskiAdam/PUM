import {createAppContainer} from 'react-navigation';
import LoginScreen from "../screens/LoginScreen";
import {createStackNavigator} from "react-navigation-stack";
import SignUpScreen from "../screens/SignUpScreen";
import Colors from "../constants/Colors";
import RestaurantsScreen from "../screens/RestaurantsScreen";
import LocalizationScreen from "../screens/LocalizationScreen";
import {createDrawerNavigator} from "@react-navigation/drawer";

const Navigator = createStackNavigator({
  LoginScreen: {
    // @ts-ignore
    screen: LoginScreen
  },
  RegisterScreen: {
    // @ts-ignore
    screen: SignUpScreen
  },
  LocalizationScreen: {
    // @ts-ignore
    screen: LocalizationScreen
  },
  RestaurantsScreen: {
    // @ts-ignore
    screen: RestaurantsScreen
  }
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Colors.main
    },
    headerTintColor: 'white'
  }
});

export default createAppContainer(Navigator);

import * as React from "react";
import {AppRegistry, View, StyleSheet, StatusBar} from "react-native";
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Navigator from "./navigation/Navigator";
import {Provider} from "react-redux";
import store from "./store";
import {createDrawerNavigator} from "@react-navigation/drawer";

const theme = {
  ...DefaultTheme,
  roundness: 10,
  dark: true
};

StatusBar.setBarStyle('light-content', true);

const Drawer = createDrawerNavigator();

const App = (): JSX.Element => {

  return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <Navigator/>
        </PaperProvider>
      </Provider>
  );
}

AppRegistry.registerComponent("Take Out", () => App);

export default App;

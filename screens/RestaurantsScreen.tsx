import React, {useEffect} from "react";
import {StyleSheet, Text} from "react-native";
import {NavigationStackScreenComponent, NavigationStackScreenProps} from "react-navigation-stack";
import Container from "../components/Container";
import AuthGuard from "../components/AuthGuard";
import LocalizationScreen from "./LocalizationScreen";
import {useSelector} from "../hooks/hooks";
import {NavigationParams} from "react-navigation";
import {IScreenProps} from "../model/IScreenProps";

const RestaurantsScreen: NavigationStackScreenComponent<NavigationStackScreenProps> = (props) => {
  const { location } = useSelector((state) => state.location);

  useEffect(() => {
    props.navigation.setParams({
      screenProps: {
        title: location.city
      }
    });
  }, [])

  return (
      <AuthGuard>
        <Container>

        </Container>
      </AuthGuard>
  )
}

LocalizationScreen.navigationOptions = navigationOptionsContainer =>  {
  // @ts-ignore
  let screenProps: IScreenProps = navigationOptionsContainer.navigation.getParam("screenProps");
  return {
    headerTitle: screenProps.title
  }
};

const styles = StyleSheet.create({
  image: {
    marginVertical: 20,
    width: 100,
    height: 100,
    alignSelf: 'center'
  }
});

export default RestaurantsScreen;

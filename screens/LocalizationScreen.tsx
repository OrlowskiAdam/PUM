import React, {useEffect, useState} from "react";
import * as Location from "expo-location";
import {Alert, Image, StyleSheet, Text, View} from "react-native";
import {Button, Headline, Paragraph, Subheading} from "react-native-paper";
import {NavigationStackScreenComponent, NavigationStackScreenProps} from "react-navigation-stack";
import Container from "../components/Container";
import {useDispatch, useSelector} from "../hooks/hooks";
import {storeLocalization} from "../slices/location";

const LocalizationScreen: NavigationStackScreenComponent<NavigationStackScreenProps> = (props) => {
  const [locationServiceEnabled, setLocationServiceEnabled] = useState<boolean>(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState<string>('Wait, we are fetching you location...');
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const {location} = useSelector(state => state.location);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
    setIsLoading(false);
  }, []);

  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
          'Usługa lokalizacji nie została włączona',
          'Włącz lokalizację by kontynuować',
          [{text: 'OK'}],
          {cancelable: false}
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  const getCurrentLocation = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
          'Nie przyznano dostępu',
          'Pozwól aplikacji użyć twojej lokalizacji',
          [{text: 'OK'}],
          {cancelable: false}
      );
    } else {
      setPermissionGranted(true);
    }

    let {coords} = await Location.getCurrentPositionAsync();

    if (coords) {
      const {latitude, longitude} = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
      let location = {
        city: response[0].city,
        country: response[0].country,
        district: response[0].district,
        isoCountryCode: response[0].isoCountryCode,
        name: response[0].name,
        postalCode: response[0].postalCode,
        region: response[0].region,
        street: response[0].street,
        subregion: response[0].subregion,
        timezone: response[0].timezone,
        isInitialized: true
      }
      dispatch(storeLocalization(location));
    }
  };

  if (!locationServiceEnabled) {
    return (
        <Container>
          <View style={styles.container}>
            <Image style={styles.image}
                   source={require('../assets/images/location.png')}
            />
            <Headline>Musisz włączyć lokalizację aby korzystać z aplikacji!</Headline>
          </View>
        </Container>
    )
  }

  if (!permissionGranted) {
    return (
        <Container>
          <View style={styles.container}>
            <Image style={styles.image}
                   source={require('../assets/images/location.png')}
            />
            <Headline>Musisz pozwolić na użycie lokalizacji, aby korzystać z aplikacji!</Headline>
          </View>
        </Container>
    )
  }

  if (!location.isInitialized) {
    return (
        <Container>
          <View style={styles.container}>
            <Image style={styles.image}
                   source={require('../assets/images/location.png')}
            />
            <Headline>Pobieram aktualną lokację.</Headline>
          </View>
        </Container>
    )
  }

  return (
      <Container>
        <View style={styles.container}>
          <Image style={styles.image}
                 source={require('../assets/images/location.png')}
          />
          <Subheading>Czy znajdujesz się w tym mieście?</Subheading>
          <Headline style={styles.city}>{location.city}</Headline>
          <Button style={styles.button} mode="contained" onPress={() => {}}>
            Tak, przejdź to restauracji
          </Button>
          <Button style={styles.button} onPress={() => {}}>
            Zlokalizuj mnie jeszcze raz
          </Button>
        </View>
      </Container>
  )
}

LocalizationScreen.navigationOptions = {
  headerTitle: 'Twoja Lokalizacja'
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%'
  },
  city: {
    marginVertical: 10
  },
  image: {
    marginVertical: 20,
    width: 160,
    height: 160,
    alignSelf: 'center'
  },
  button: {
    marginVertical: 10,
    width: '100%'
  }
});

export default LocalizationScreen;

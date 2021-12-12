import React from "react";
import {useEffect, useState} from "react";
import * as Location from "expo-location";
import {Alert, Text} from "react-native";
import {Button} from "react-native-paper";

const Localization: React.FC = (props) => {
  const [locationServiceEnabled, setLocationServiceEnabled] = useState<boolean>(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState<string>('Wait, we are fetching you location...');
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

      for (let item of response) {
        let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;

        setDisplayCurrentAddress(address);
      }
    }
  };

  if (isLoading) {
    return (
        <>
          <Text>Pobieram lokalizację</Text>
        </>
    )
  }

  if (!isLoading && !permissionGranted) {
    return (
        <>
          <Text>Nie przyznano dostępu do lokalizacji</Text>
        </>
    )
  }

  if (!isLoading && permissionGranted) {
    return (
        <>
          <Text>{displayCurrentAddress}</Text>
          <Button onPress={() => Location.requestForegroundPermissionsAsync()}>
            Text
          </Button>
          {props.children}
        </>
    )
  }

  return null;
}

export default Localization;

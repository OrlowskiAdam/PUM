import React, {useEffect, useState} from "react";
import {AsyncStorage, Image, StyleSheet, Alert} from "react-native";
import {Button, Snackbar, TextInput} from "react-native-paper";
import Container from "../components/Container";
import {NavigationStackScreenComponent, NavigationStackScreenProps} from "react-navigation-stack";
import {useDispatch, useSelector} from "../hooks/hooks";
import {getCurrentUser, signIn} from "../api/UserAPI";
import {storeUser} from "../slices/user";
import {OAUTH_ACCESS_TOKEN} from "../constants/constants";

const LoginScreen: NavigationStackScreenComponent<NavigationStackScreenProps> = (props): JSX.Element => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [requestLoading, setRequestLoading] = useState<boolean>(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const createAccountScreenHandler = (): void => {
    props.navigation.replace('LocalizationScreen');
  }

  const loginHandler = () => {
    if (requestLoading) return;
    setRequestLoading(true);
    const body = {
      username,
      password
    }
    signIn(body)
        .then(async response => {
          await AsyncStorage.setItem(OAUTH_ACCESS_TOKEN, response.accessToken);
          await getCurrentUser()
              .then(response => {
                dispatch(storeUser(response));
                props.navigation.navigate('LocalizationScreen');
              })
              .catch(() => {
                Alert.alert("Wystąpił problem", "Nie udało się pobrać danych użytkownika.");
              });
        })
        .catch(() => {
          Alert.alert("Wystąpił problem", "Nie udało się zalogować. Sprawdź czy dane są prawidłowe i czy masz połączenie z internetem.");
        })
        .finally(() => setRequestLoading(false));
  }

  useEffect(() => {
    if (props.navigation.state.params) {
      if (props.navigation.state.params.signUpSuccessful) {
        setSnackbarOpen(true);
      }
    }
  }, []);

  return (
      <Container>
        <TextInput
            style={styles.verticalMargin}
            mode="outlined"
            label="Login"
            value={username}
            onChangeText={text => setUsername(text)}
            onPressIn={() => {}}
            onPressOut={() => {}}
        />
        <TextInput
            style={styles.verticalMargin}
            mode="outlined"
            label="Hasło"
            value={password}
            onChangeText={text => setPassword(text)}
            onPressIn={() => {}}
            onPressOut={() => {}}
        />
        <Button loading={requestLoading} mode="contained" style={styles.verticalMargin} onPress={loginHandler}>
          Zaloguj
        </Button>
        <Button style={styles.verticalMargin} onPress={createAccountScreenHandler}>
          Utwórz konto
        </Button>
        <Image style={styles.image}
               source={require('../assets/images/pizza.png')}
        />
        <Snackbar
            visible={isSnackbarOpen}
            onDismiss={() => setSnackbarOpen(false)}
            action={{
              label: 'Zajebiście',
              onPress: () => {
                // Do something
              }
            }}
        >
          Możesz się teraz zalogować!
        </Snackbar>
      </Container>
  )
}

const styles = StyleSheet.create({
  verticalMargin: {
    marginVertical: 10
  },
  image: {
    marginVertical: 20,
    width: 100,
    height: 100,
    alignSelf: 'center'
  }
});

LoginScreen.navigationOptions = {
  headerTitle: 'Logowanie'
};

export default LoginScreen;

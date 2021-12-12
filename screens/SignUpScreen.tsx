import React, {useState} from "react";
import {Image, StyleSheet} from "react-native";
import Container from "../components/Container";
import {Button, TextInput} from "react-native-paper";
import LoginScreen from "./LoginScreen";
import {signUp} from "../api/UserAPI";
import {NavigationStackScreenComponent, NavigationStackScreenProps} from "react-navigation-stack";

const SignUpScreen: NavigationStackScreenComponent<NavigationStackScreenProps> = (props) => {
  const [name, setName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const loginScreenHandler = (): void => {
    props.navigation.replace('LoginScreen');
  }

  const signUpHandler = (): void => {
    if (isLoading) return;
    setLoading(true);
    const body = {
      name,
      surname,
      login: username,
      password
    }
    signUp(body)
        .then(() => {
          props.navigation.replace(
              'LoginScreen',
              {
                signUpSuccessful: true
              }
          )
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
  }

  return (
      <Container>
        <TextInput
            style={styles.verticalMargin}
            mode="outlined"
            label="Imię"
            value={name}
            onChangeText={text => setName(text)}
            onPressIn={() => {
            }}
            onPressOut={() => {
            }}
        />
        <TextInput
            style={styles.verticalMargin}
            mode="outlined"
            label="Nazwisko"
            value={surname}
            onChangeText={text => setSurname(text)}
            onPressIn={() => {
            }}
            onPressOut={() => {
            }}
        />
        <TextInput
            style={styles.verticalMargin}
            mode="outlined"
            label="Login"
            value={username}
            onChangeText={text => setUsername(text)}
            onPressIn={() => {
            }}
            onPressOut={() => {
            }}
        />
        <TextInput
            style={styles.verticalMargin}
            mode="outlined"
            label="Hasło"
            value={password}
            onChangeText={text => setPassword(text)}
            onPressIn={() => {
            }}
            onPressOut={() => {
            }}
        />
        <Button loading={isLoading} mode="contained" style={styles.verticalMargin} onPress={signUpHandler}>
          Rejestracja
        </Button>
        <Button style={styles.verticalMargin} onPress={loginScreenHandler}>
          Już mam konto
        </Button>
        <Image style={styles.image}
               source={require('../assets/images/sandwiches.png')}
        />
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

SignUpScreen.navigationOptions = {
  headerTitle: 'Rejestracja'
};

export default SignUpScreen;

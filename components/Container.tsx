import React from "react";
import {View, StyleSheet} from "react-native";

const Container = ({children}: { children: JSX.Element | JSX.Element[] }): JSX.Element => {
  return (
      <View style={styles.body}>
        {children}
      </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignContent: 'center',
    padding: 10
  }
});

export default Container;

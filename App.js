import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import Login from "./components/Login/containers/Login";
import { createAppContainer } from "react-navigation";

const navigationOptions = () => ({ header: null });

let StackNavigator = createStackNavigator(

  {
      Login: {
          screen: Login,
          navigationOptions
      }
  },
  {
      initialRouteName: "Login"
  }
);

let Navigation = createAppContainer(StackNavigator);

export default class App extends React.Component {  
  render() {

    return (
        <Navigation />
  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

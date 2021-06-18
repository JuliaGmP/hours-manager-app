import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { createStackNavigator } from "react-navigation-stack";
import Login from "./components/Login/containers/Login";
import { createAppContainer } from "react-navigation";
import SplashScreen from "./components/SplashScreen/containers/SplashScreen";
import Home from "./components/Home/containers/Home";
import AddHours from "./components/AddHours/containers/AddHours";
import AddHoursSuccess from "./components/AddHoursSuccess/containers/AddHoursSuccess";
import ProjectsDetail from "./components/ProjectsDetail/containers/ProjectsDetail";

const navigationOptions = () => ({ header: null });

let StackNavigator = createStackNavigator(

  {
    
      SplashScreen: {
          screen: SplashScreen,
          navigationOptions
      },
      Login: {
          screen: Login,
          navigationOptions
      },
      Home: {
        screen: Home,
        navigationOptions
      },
      AddHours: {
        screen: AddHours,
        navigationOptions
      },
      AddHoursSuccess: {
        screen: AddHoursSuccess,
        navigationOptions
      },
      ProjectsDetail: {
        screen: ProjectsDetail,
        navigationOptions
      }
  },
  {
      initialRouteName: "SplashScreen"
  }
);

let Navigation = createAppContainer(StackNavigator);

export default class App extends React.Component {  
  render() {

    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
  
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

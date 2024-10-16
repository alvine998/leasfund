import {View, Text} from 'react-native';
import React from 'react';
import Splash from './src/pages/splash';
import Intro from './src/pages/intro';
import Home from './src/pages/home';
import Login from './src/pages/login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabs from './src/components/BottomTabs';
import ConfirmOTP from './src/pages/confirmotp';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={BottomTabs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ConfirmOTP" component={ConfirmOTP} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Splash" component={Splash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

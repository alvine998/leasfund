import {View, Text} from 'react-native';
import React from 'react';
import Splash from './src/pages/splash';
import Intro from './src/pages/intro';
import Home from './src/pages/home';
import Login from './src/pages/login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Splash" component={Splash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

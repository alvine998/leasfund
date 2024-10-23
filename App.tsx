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
import DetailProduct from './src/pages/product/detail';
import FormSubmission from './src/pages/product/detail/form';
import Card from './src/pages/card';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="FormSubmission" component={FormSubmission} />
        <Stack.Screen name="Card" component={Card} />
        <Stack.Screen name="DetailProduct" component={DetailProduct} />
        <Stack.Screen name="Home" component={BottomTabs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ConfirmOTP" component={ConfirmOTP} />
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Splash" component={Splash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

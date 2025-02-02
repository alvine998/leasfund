import {View, Text, ActivityIndicator} from 'react-native';
import React, {Suspense} from 'react';
import Splash from './src/screens/splash';
import Intro from './src/screens/intro';
import Home from './src/screens/home';
import Login from './src/screens/login';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabs from './src/components/BottomTabs';
import ConfirmOTP from './src/screens/confirmotp';
import DetailProduct from './src/screens/product/detail';
import FormSubmission from './src/screens/product/detail/form';
import Card from './src/screens/card';
import Simulation from './src/screens/simulation';
import EditProfile from './src/screens/account/edit';
import Customer from './src/screens/customer';
import Privacy from './src/screens/privacy';
import Term from './src/screens/term';
import AboutUs from './src/screens/aboutus';
import Member from './src/screens/member';
import History from './src/screens/history';
import Commision from './src/screens/commision';
import Performance from './src/screens/performace';
import CustomerDetail from './src/screens/customer/detail';
import FAQ from './src/screens/faq';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Suspense fallback={<ActivityIndicator size={'large'} color="#0000ff" />}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="FAQ" component={FAQ} />
          <Stack.Screen name="CustomerDetail" component={CustomerDetail} />
          <Stack.Screen name="Performance" component={Performance} />
          <Stack.Screen name="Commision" component={Commision} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="Member" component={Member} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="Term" component={Term} />
          <Stack.Screen name="Privacy" component={Privacy} />
          <Stack.Screen name="Customer" component={Customer} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Simulation" component={Simulation} />
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
    </Suspense>
  );
}

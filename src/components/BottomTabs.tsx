import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Home from '../pages/home';
import FA5Icon from 'react-native-vector-icons/FontAwesome5'
import Card from '../pages/card';
import Account from '../pages/account';
import Product from '../pages/product';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="BottomHome"
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="BottomHome"
        component={Home}
        options={{
          tabBarLabel: 'Beranda',
          tabBarIcon: ({color, size}) => (
            <FA5Icon name="home" color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="Product"
        component={Product}
        options={{
          tabBarLabel: 'Produk',
          tabBarIcon: ({color, size}) => (
            <FA5Icon name="clipboard-list" color={color} size={size} />
          ),
        }}
      />
       <Tab.Screen
        name="BottomCard"
        component={Card}
        options={{
          tabBarLabel: 'Kartu',
          tabBarIcon: ({color, size}) => (
            <FA5Icon name="address-card" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="BottomHistory"
        component={Home}
        options={{
          tabBarLabel: 'Riwayat',
          tabBarIcon: ({color, size}) => (
            <FA5Icon name="bookmark" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="BottomAccount"
        component={Account}
        options={{
          tabBarLabel: 'Akun',
          tabBarIcon: ({color, size}) => (
            <FA5Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';

export default function Splash() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={require('./logo.png')}
        style={{width: normalize(350), height: normalize(200)}}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

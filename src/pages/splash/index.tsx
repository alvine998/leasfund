import {Animated, Easing, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import normalize from 'react-native-normalize';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash({navigation}: any) {
  const [isLogo, setIsLogo] = useState<boolean>(true);
  const spinValue = useRef(new Animated.Value(0)).current; // Create animated value

  useEffect(() => {
    setTimeout(() => {
      setIsLogo(false);
    }, 1500);
    // Create an infinite spinning animation
    let data: any = null;
    const getData = async () => {
      data = await AsyncStorage.getItem('login');
    };
    getData();
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000, // Duration of one full spin (in milliseconds)
        easing: Easing.linear, // Ensure it spins smoothly
        useNativeDriver: true, // Required for performance
      }),
    );

    spinAnimation.start(); // Start the animation when the component mounts

    setTimeout(() => {
      spinAnimation.stop();
      if (!data) {
        return navigation.navigate('Intro');
      }
      if (!JSON.parse(data)?.otp) {
        return navigation.navigate('Login');
      }
      navigation.navigate('Home');
    }, 3000);
  }, [spinValue]);

  // Interpolate the rotation value from 0 to 1 to a full 360-degree spin
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Rotate from 0 to 360 degrees
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      {isLogo ? (
        <Image
          source={require('../../assets/images/logo_full.png')}
          style={{width: normalize(300), height: normalize(200)}}
        />
      ) : (
        <Animated.Image
          source={require('../../assets/images/logo_icon.png')}
          style={{
            width: normalize(200),
            height: normalize(200),
            transform: [{rotate: spin}],
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

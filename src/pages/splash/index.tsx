import {Animated, Easing, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import normalize from 'react-native-normalize';

export default function Splash({navigation}: any) {
  const spinValue = useRef(new Animated.Value(0)).current; // Create animated value

  useEffect(() => {
    // Create an infinite spinning animation
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
      navigation.navigate('Home')
    }, 3000);
  }, [spinValue]);

  // Interpolate the rotation value from 0 to 1 to a full 360-degree spin
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Rotate from 0 to 360 degrees
  });

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Animated.Image
        source={require('../../assets/images/logo_icon.png')}
        style={{
          width: normalize(200),
          height: normalize(200),
          transform: [{rotate: spin}],
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

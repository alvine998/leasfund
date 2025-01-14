import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../../../components/BackButton';
import {COLOR} from '../../../utils/color';

export default function DetailProduct({navigation}: any) {
  const widthScreen = Dimensions.get('screen').width;
  return (
    <View style={{padding: normalize(20), paddingTop: normalize(40)}}>
      <BackButton navigation={navigation} />
      <View
        style={{
          flexDirection: 'row',
          gap: normalize(10),
          marginTop: normalize(20),
        }}>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.setItem('vType', 'car');
            AsyncStorage.setItem('continue', '');
            navigation.navigate('FormSubmission');
          }}
          style={{
            width: widthScreen / 2 - 25,
            height: normalize(100),
            backgroundColor: 'white',
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: normalize(10),
            elevation: 5
          }}>
          <FA5Icon name="car" color={COLOR.darkGreen} size={normalize(40)} />
          <Text style={{fontSize: normalize(20), color: 'black'}}>Mobil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.setItem('vType', 'motor');
            AsyncStorage.setItem('continue', '');
            navigation.navigate('FormSubmission');
          }}
          style={{
            width: widthScreen / 2 - 25,
            height: normalize(100),
            backgroundColor: 'white',
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: normalize(10),
            elevation: 5
          }}>
          <FA5Icon
            name="motorcycle"
            color={COLOR.darkGreen}
            size={normalize(40)}
          />
          <Text style={{fontSize: normalize(20), color: 'black'}}>Motor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

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
          {/* <Image
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/leasefund.appspot.com/o/rb_200.png?alt=media&token=735c2fd5-f292-4125-8dfa-d9795cc0e878',
            }}
            style={{width: normalize(80), height: normalize(80)}}
          /> */}
          <FA5Icon name="car" color={COLOR.darkGreen} size={normalize(40)} />
          <Text style={{fontSize: normalize(20), color: 'black'}}>Mobil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.setItem('vType', 'motor');
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
          {/* <Image
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/leasefund.appspot.com/o/e1224c4af2651b51bf977d965d9f5106.jpg?alt=media&token=0b10b82b-b23d-4139-908f-e6fba1c8e66f',
            }}
            style={{width: normalize(50), height: normalize(50)}}
          /> */}
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

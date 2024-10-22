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

export default function DetailProduct({navigation}: any) {
  const widthScreen = Dimensions.get('screen').width;
  return (
    <View style={{padding: normalize(20), paddingTop: normalize(40)}}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          flexDirection: 'row',
          gap: normalize(10),
          alignItems: 'center',
        }}>
        <FA5Icon name="chevron-left" size={normalize(20)} color={'black'} />
        <Text style={{fontSize: normalize(18), color: 'black'}}>Kembali</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          gap: normalize(10),
          marginTop: normalize(20),
        }}>
        <TouchableOpacity
          style={{
            width: (widthScreen / 2) - 25,
            height: normalize(100),
            backgroundColor: 'white',
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/leasefund.appspot.com/o/rb_200.png?alt=media&token=735c2fd5-f292-4125-8dfa-d9795cc0e878',
            }}
            style={{width: normalize(70), height: normalize(50)}}
          />
          <Text style={{fontSize: normalize(20), color: 'black'}}>Mobil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: (widthScreen / 2) - 25,
            height: normalize(100),
            backgroundColor: 'white',
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/leasefund.appspot.com/o/e1224c4af2651b51bf977d965d9f5106.jpg?alt=media&token=0b10b82b-b23d-4139-908f-e6fba1c8e66f',
            }}
            style={{width: normalize(70), height: normalize(50)}}
          />
          <Text style={{fontSize: normalize(20), color: 'black'}}>Motor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

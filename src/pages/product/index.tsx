import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import {COLOR} from '../../utils/color';

export default function Product({navigation}: any) {
  let products = [
    {
      id: 1,
      name: 'BFI',
      icon: '',
      description: 'Leasing motor & mobil cepat cair kurang dari 2 jam',
    },
    {
      id: 2,
      name: 'BAF',
      icon: '',
      description: 'Leasing motor & mobil cepat cair kurang dari 2 jam',
    },
    {
      id: 3,
      name: 'Prabu',
      icon: '',
      description: 'Leasing motor & mobil cepat cair kurang dari 2 jam',
    },
    {
      id: 4,
      name: 'LeaseFund',
      icon: '',
      description: 'Leasing motor & mobil cepat cair kurang dari 2 jam',
    },
  ];
  return (
    <ScrollView style={{padding: normalize(20)}}>
      <Text
        style={{color: 'black', fontSize: normalize(20), textAlign: 'center'}}>
        Mitra Produk Kami
      </Text>
      <View style={{marginVertical: normalize(20)}}>
        {products?.map((v: any, i: number) => (
          <TouchableOpacity
            key={i}
            onPress={() => {
              navigation.navigate('DetailProduct');
            }}
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: normalize(100),
              borderRadius: 20,
              marginTop: normalize(10),
              paddingHorizontal: normalize(20),
              paddingVertical: normalize(10),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{fontSize: normalize(20), color: 'black'}}>
                {v?.name}
              </Text>
              <Text style={{fontSize: normalize(14), color: 'black', width: normalize(200)}}>
                {v?.description}
              </Text>
            </View>
            <View>
              <Image
                source={require('../../assets/images/logo_icon.png')}
                style={{width: normalize(50), height: normalize(50)}}
              />
              <Text
                style={{
                  color: COLOR.blue,
                  marginTop: normalize(10),
                  fontWeight: 'bold',
                }}>
                Pilih Mitra
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

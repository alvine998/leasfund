import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackButton from '../../components/BackButton';
import normalize from 'react-native-normalize';
import {COLOR} from '../../utils/color';

export default function CustomerDetail({navigation}: any) {
  const descData = [
    {label: 'Nama Nasabah', value: 'Nanang Sumarna'},
    {label: 'NIK', value: '3202490697890005'},
    {label: 'Tanggal Dibuat', value: '18-11-2024 08:49'},
    {label: 'Leasing', value: 'BFI'},
    {label: 'No Telepon', value: '08998899888'},
    {label: 'No Kendaraan', value: 'D 4355 UAH'},
  ];
  return (
    <ScrollView style={{padding: normalize(20)}}>
      <BackButton navigation={navigation} />
      <View
        style={{
          backgroundColor: COLOR.default,
          elevation: 5,
          padding: normalize(20),
          borderRadius: 10,
          marginTop: normalize(20),
          paddingBottom: normalize(40)
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: normalize(20),
            fontWeight: 'bold',
          }}>
          NKJ324N2HBJB44HJ2B3
        </Text>
        {descData?.map((v: any, i: number) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: normalize(20),
              borderBottomWidth: 1,
              borderBottomColor: '#dfdfdf',
              paddingBottom: normalize(10),
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: normalize(16),
                fontWeight: 'bold',
              }}>
              {v?.label}
            </Text>
            <Text style={{color: 'white', fontSize: normalize(16)}}>
              {v?.value}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

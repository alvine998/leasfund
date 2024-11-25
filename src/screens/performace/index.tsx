import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import BackButton from '../../components/BackButton';
import normalize from 'react-native-normalize';
import {COLOR} from '../../utils/color';
import moment from 'moment';

export default function Performance({navigation}: any) {
  return (
    <ScrollView style={{padding: normalize(20)}}>
      <BackButton navigation={navigation} />
      <View style={{marginTop: normalize(20)}}>
        <Text style={{color: COLOR.darkGrey}}>Performa Anda Untuk:</Text>
        <Text style={{color: COLOR.darkGreen}}>
          01 Okt 2024 - {moment().format('DD-MMMM-YYYY')}
        </Text>
      </View>
      <View
        style={{
          marginTop: normalize(50),
          borderWidth: 1,
          borderRadius: 10,
          width: '100%',
          padding: normalize(20),
          backgroundColor: COLOR.default,
          borderColor: COLOR.gray,
          elevation: 5,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
            padding: normalize(10),
            paddingVertical: normalize(20),
          }}>
          <Text style={{color: COLOR.darkGrey}}>
            Total Insentif Saat Ini
          </Text>
          <Text
            style={{
              color: COLOR.default,
              fontSize: normalize(24),
              fontWeight: 'bold',
            }}>
            Rp 0
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: normalize(10),
            marginTop: normalize(10),
            width: '100%',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              elevation: 5,
              justifyContent: 'center',
              alignItems: 'center',
              padding: normalize(10),
              width: '48%',
            }}>
            <Text style={{color: COLOR.darkGrey}}>Jumlah GoLive</Text>
            <Text
              style={{
                color: 'black',
                fontSize: normalize(24),
                fontWeight: 'bold',
              }}>
              0
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 10,
              elevation: 5,
              justifyContent: 'center',
              alignItems: 'center',
              padding: normalize(10),
              width: '48%',
            }}>
            <Text style={{color: COLOR.darkGrey, textAlign: 'center'}}>
              Nominal Pengajuan Dana Tunai
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: normalize(24),
                fontWeight: 'bold',
              }}>
              0
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
            padding: normalize(10),
            marginTop: normalize(10),
            paddingVertical: normalize(20),
          }}>
          <Text style={{color: COLOR.darkGrey}}>Dana Tunai Cair</Text>
          <Text
            style={{
              color: COLOR.default,
              fontSize: normalize(24),
              fontWeight: 'bold',
            }}>
            Rp 0
          </Text>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
            padding: normalize(10),
            marginTop: normalize(10),
            paddingVertical: normalize(20),
          }}>
          <Text style={{color: COLOR.darkGrey}}>Mobil Terjual</Text>
          <Text
            style={{
              color: COLOR.default,
              fontSize: normalize(24),
              fontWeight: 'bold',
            }}>
            0
          </Text>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
            padding: normalize(10),
            marginTop: normalize(10),
            paddingVertical: normalize(20),
          }}>
          <Text style={{color: COLOR.darkGrey}}>Motor Terjual</Text>
          <Text
            style={{
              color: COLOR.default,
              fontSize: normalize(24),
              fontWeight: 'bold',
            }}>
            0
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

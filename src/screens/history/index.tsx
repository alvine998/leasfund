import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import normalize from 'react-native-normalize';
import BackButton from '../../components/BackButton';
import {COLOR} from '../../utils/color';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import Input from '../../components/Input';
import {RefreshControl} from 'react-native';

export default function History({navigation}: any) {
  const [refresh, setRefresh] = useState<boolean>(false);
  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      // getProduct();
      setRefresh(false);
    }, 2000);
  };
  return (
    <View style={{padding: normalize(20)}}>
      <Text
        style={{
          fontSize: normalize(24),
          color: 'black',
          textAlign: 'center',
          marginTop: normalize(20),
        }}>
        Riwayat Prospek
      </Text>
      <Input
        onChange={(e: any) => {}}
        placeholder={'Cari prospek...'}
        value={''}
        isRequired
      />
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
        }>
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            elevation: 5,
            marginTop: normalize(30),
            borderRadius: 10,
            padding: normalize(20),
          }}>
          <View>
            <Text
              style={{
                color: COLOR.default,
                fontSize: normalize(18),
                fontWeight: 'bold',
              }}>
              Pencairan
            </Text>
            <Text style={{color: COLOR.darkGrey, fontSize: normalize(14)}}>
              {moment().format('DD-MM-YYYY HH:mm:ss')}
            </Text>
          </View>
          <Text
            style={{
              color: 'black',
              fontSize: normalize(24),
              fontWeight: 'bold',
              marginTop: normalize(10),
            }}>
            Nanang Sumarna
          </Text>
          <View style={{marginTop: normalize(20)}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: COLOR.darkGrey,
                  fontSize: normalize(18),
                }}>
                Leasing
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: normalize(18),
                  fontWeight: 'bold',
                }}>
                BFI
              </Text>
            </View>
          </View>

          <View style={{marginTop: normalize(10)}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: COLOR.darkGrey,
                  fontSize: normalize(18),
                }}>
                Nominal Pinjaman
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: normalize(18),
                  fontWeight: 'bold',
                }}>
                Rp 40.000.000
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: COLOR.default,
              height: normalize(40),
              width: '100%',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: normalize(20),
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: normalize(18),
                fontWeight: 'bold',
              }}>
              Cek Aplikasi
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});

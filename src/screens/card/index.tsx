import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import normalize from 'react-native-normalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOR } from '../../utils/color';
import BackButton from '../../components/BackButton';

export default function Card({ navigation }: any) {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [detail, setDetail] = useState<any>(null);

  const getData = async () => {
    const register: any = await AsyncStorage.getItem('register');
    setDetail(JSON.parse(register));
  };

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
      }>
      <View style={{ padding: normalize(20) }}>
        <BackButton navigation={navigation} />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          marginTop: normalize(0),
        }}>
        <View
          style={{
            backgroundColor: COLOR.blue,
            width: '100%',
            height: normalize(100),
            paddingVertical: normalize(20),
            paddingHorizontal: normalize(20),
          }}>
          <Text style={{ fontSize: normalize(24), fontWeight: 'bold', color: "white" }}>
            Rendi Imam
          </Text>
          <Text style={{ fontSize: normalize(24), fontWeight: 'bold', color: "white" }}>
            Referral: ADGJ89
          </Text>
        </View>
        <View style={{ width: "100%", paddingHorizontal: normalize(20), marginTop: normalize(20) }}>
          <Text style={{ color: COLOR.darkGrey, textAlign: "left", fontSize: normalize(18), fontWeight: "bold" }}>Telepon: +6285907079999</Text>
          <Text style={{ color: COLOR.darkGrey, textAlign: "left", fontSize: normalize(18), fontWeight: "bold", marginTop: normalize(10) }}>Email: alvinecom2018@gmail.com</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", width: "100%", marginTop: normalize(30), paddingHorizontal: normalize(20) }}>
          <TouchableOpacity style={{ width: "50%" }}>
            <Text style={{ color: COLOR.blue, fontSize: normalize(18), textAlign: "center", fontWeight: "bold" }}>Profil</Text>
            <View style={{ width: "100%", height: normalize(1), backgroundColor: COLOR.blue, padding:1, marginTop: normalize(20) }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: "50%" }}>
            <Text style={{ color: COLOR.darkGrey, fontSize: normalize(18), textAlign: "center", fontWeight: "bold" }}>Ajak Teman</Text>
          </TouchableOpacity>
        </View>
        {/* <Image
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/leasefund.appspot.com/o/card%2Fwww.leasfund.com.png?alt=media&token=fdb0db5f-b510-4db1-aa47-707317ca5b97',
          }}
          style={{
            width: normalize(350),
            height: normalize(200),
            borderRadius: 20,
          }}
        /> */}

        <Image
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/leasefund.appspot.com/o/card%2Fwww.leasfund.com%20(1).png?alt=media&token=d056f074-56be-4a97-9b92-af1c7ae64f8b',
          }}
          style={{
            width: normalize(350),
            height: normalize(200),
            borderRadius: 20,
            marginTop: normalize(30),
          }}
        />
        <View style={{ marginTop: normalize(-185) }}>
          <Text
            style={{
              textDecorationLine: 'underline',
              fontSize: normalize(20),
              fontWeight: 'bold',
              color: 'black',
              marginLeft: normalize(150),
            }}>
            {detail?.name || 'Adrian Septian'}
          </Text>
        </View>
        <View style={{ marginLeft: normalize(50), marginTop: normalize(25) }}>
          <Text
            style={{
              fontSize: normalize(12),
              fontWeight: '500',
              color: 'black',
              marginLeft: normalize(150),
            }}>
            {detail?.phone || '089900009999'}
          </Text>
          <Text
            style={{
              fontSize: normalize(detail?.email?.length > 20 ? 10 : 12),
              fontWeight: '500',
              color: 'black',
              marginLeft: normalize(150),
              marginTop: normalize(17),
            }}>
            {detail?.email || 'adrianseptian@gmail.com'}
          </Text>
        </View>
        <View style={{ marginLeft: normalize(-183), marginTop: normalize(-1) }}>
          <Image
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/leasefund.appspot.com/o/Untitled%201%20(1).png?alt=media&token=650e4bcc-a605-4af3-a705-9fed3b8a80e0',
            }}
            style={{ width: normalize(45), height: normalize(45) }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

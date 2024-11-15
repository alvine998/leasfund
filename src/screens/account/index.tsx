import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import normalize from 'react-native-normalize';
import { COLOR } from '../../utils/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CONFIG } from '../../config';

export default function Account({ navigation }: any) {
  const [data, setData] = useState<any>();
  const getData = async () => {
    let result: any = await AsyncStorage.getItem('login')
    if (result) {
      result = JSON.parse(result)
      const user = await axios.get(CONFIG.base_url_api + `/user/list?email=${result?.email}`, {
        headers: {
          "access_token": CONFIG.access_token
        }
      })
      setData(user?.data?.items[0])
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: normalize(30),
        }}>
        <FA5Icon name="user-circle" size={normalize(150)} color={COLOR.blue} />
        <Text style={{ marginTop: normalize(10), fontSize: normalize(30), color: COLOR.darkGrey }}>
          {data?.name}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: normalize(20),
          flexDirection: 'column',
          gap: normalize(20),
        }}>
        <TouchableOpacity
          style={{
            padding: normalize(10),
            width: '100%',
            height: normalize(45),
            borderRadius: 10,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: COLOR.gray,
            elevation: 5
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: normalize(20),
            }}>
            Ubah Profil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: normalize(10),
            width: '100%',
            height: normalize(45),
            borderRadius: 10,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: COLOR.gray,
            elevation: 5
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: normalize(20),
            }}>
            Tentang Kami
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: normalize(10),
            width: '100%',
            height: normalize(45),
            borderRadius: 10,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: COLOR.gray,
            elevation: 5
          }}
          onPress={() => { navigation.navigate("Term") }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: normalize(20),
            }}>
            Ketentuan Pengguna
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: normalize(10),
            width: '100%',
            height: normalize(45),
            borderRadius: 10,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: COLOR.gray,
            elevation: 5
          }}
          onPress={() => { navigation.navigate("Privacy") }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: normalize(20),
            }}>
            Kebijakan Privasi
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={{
            padding: normalize(10),
            width: '100%',
            height: normalize(45),
            borderRadius: 10,
            backgroundColor: COLOR.red,
            borderWidth: 1,
            borderColor: COLOR.gray,
            elevation: 5

          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: normalize(20),
            }}>
            Keluar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

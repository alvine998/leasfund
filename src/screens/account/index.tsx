import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import normalize from 'react-native-normalize';
import {COLOR} from '../../utils/color';

export default function Account({navigation}: any) {
  return (
    <ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: normalize(30),
        }}>
        <FA5Icon name="user-circle" size={normalize(150)} color={COLOR.blue} />
        <Text style={{marginTop: normalize(10), fontSize: normalize(30)}}>
          Adrian Septian
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
            borderRadius: 20,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: COLOR.gray,
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
            borderRadius: 20,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: COLOR.gray,
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
            borderRadius: 20,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: COLOR.gray,
          }}>
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
            borderRadius: 20,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: COLOR.gray,
          }}>
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
            borderRadius: 20,
            backgroundColor: COLOR.red,
            borderWidth: 1,
            borderColor: COLOR.gray,
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

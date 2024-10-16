import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import normalize from 'react-native-normalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLOR} from '../../utils/color';

export default function ConfirmOTP({navigation}: any) {
  const [otp, setOtp] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [detail, setDetail] = useState<any>(null);
  const [login, setLogin] = useState<any>(null);

  const getData = async () => {
    const register: any = await AsyncStorage.getItem('register');
    const login: any = await AsyncStorage.getItem('login');
    setDetail(JSON.parse(register));
    setLogin(JSON.parse(login));
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async () => {
    try {
      if (detail?.otp !== otp) {
        return setErrorMessage('Kode OTP Salah');
      }
      await AsyncStorage.setItem(
        'login',
        JSON.stringify({...login, otp: detail?.otp}),
      );
      Alert.alert(`Selamat Datang`);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normalize(50),
        paddingHorizontal: normalize(20),
        flex: 1,
      }}>
      <View>
        <Text
          style={{color: 'black', fontSize: normalize(24), fontWeight: 'bold'}}>
          Konfirmasi Kode OTP
        </Text>
        <Text style={{color: 'black'}}>
          Silahkan Masukkan Kode OTP yang telah dikirimkan ke email:{' '}
          {detail?.email}
        </Text>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 20,
          marginTop: normalize(30),
          width: '100%',
        }}>
        <TextInput
          placeholder="OTP"
          value={otp}
          maxLength={6}
          style={{paddingLeft: normalize(20), height: normalize(40)}}
          onChangeText={e => setOtp(e)}
        />
      </View>
      {errorMessage && (
        <Text
          style={{
            color: COLOR.red,
            marginLeft: normalize(20),
            textAlign: 'left',
          }}>
          {errorMessage}
        </Text>
      )}
      <TouchableOpacity
        onPress={onSubmit}
        style={{
          backgroundColor: '#4bba4e',
          height: normalize(35),
          width: '100%',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: normalize(20),
        }}>
        <Text style={{color: 'white'}}>Masuk</Text>
      </TouchableOpacity>
    </View>
  );
}

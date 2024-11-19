import {
  ActivityIndicator,
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
import {usePostData} from '../../hooks/api';
import {CONFIG} from '../../config';
import axios from 'axios';

export default function ConfirmOTP({navigation}: any) {
  const [otp, setOtp] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [detail, setDetail] = useState<any>(null);
  const [login, setLogin] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setIsLoading(true);
      // if (detail?.otp !== otp) {
      //   return setErrorMessage('Kode OTP Salah');
      // }
      const result = await axios.post(
        CONFIG.base_url_api + `/user/confirmotp`,
        {otp},
        {
          headers: {
            access_token: CONFIG.access_token,
          },
        },
      );
      if (result) {
        Alert.alert(`Selamat Datang`);
        navigation.navigate('Home');
      } else {
        Alert.alert('Kode OTP Salah!');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
          style={{
            paddingLeft: normalize(20),
            height: normalize(40),
            color: COLOR.darkGrey,
          }}
          keyboardType="number-pad"
          placeholderTextColor={COLOR.darkGrey}
          onChangeText={e => setOtp(e)}
        />
      </View>
      <View style={{position: 'relative'}}>
        {errorMessage && (
          <Text
            style={{
              color: COLOR.red,
              textAlign: 'left',
              position: 'absolute',
              right: 0,
            }}>
            {errorMessage}
          </Text>
        )}
      </View>
      <TouchableOpacity
        onPress={onSubmit}
        disabled={isLoading}
        style={{
          backgroundColor: '#4bba4e',
          height: normalize(35),
          width: '100%',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: normalize(20),
        }}>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={'white'} />
        ) : (
          <Text style={{color: 'white'}}>
            {isLoading ? 'Loading...' : 'Masuk'}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

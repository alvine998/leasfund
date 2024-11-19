import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import normalize from 'react-native-normalize';
import {COLOR} from '../../utils/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {usePostData} from '../../hooks/api';
import {CONFIG} from '../../config';
import axios from 'axios';

export default function Login({navigation}: any) {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const heightScreen = Dimensions.get('screen').height;

  const [payload, setPayload] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const {data, error, loading, postData} = usePostData(
    isLogin
      ? CONFIG.base_url_api + `/user/sendotp`
      : CONFIG.base_url_api + `/user/create`,
    payload,
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const initialState = [
    {value: 'phone', label: 'No Telepon', required: true},
    {value: 'email', label: 'Email', required: true},
    {value: 'referral_code', label: 'Kode Referal', required: false},
  ];

  useEffect(() => {
    setPayload(null);
  }, []);

  const onLogin = async () => {
    setIsLoading(true);
    try {
      if (!payload) {
        return setErrorMessage('Harap lengkapi email');
      }
      const register: any = await AsyncStorage.getItem('register');
      const result = await axios.post(
        CONFIG.base_url_api + `/user/sendotp`,
        payload,
        {
          headers: {
            access_token: CONFIG.access_token,
          },
        },
      );
      const data = await AsyncStorage.setItem('login', JSON.stringify(payload));
      setIsLoading(false);
      Alert.alert('Berhasil Masuk, Silahkan Cek Email Untuk Konfirmasi OTP');
      navigation.navigate('ConfirmOTP');
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const onRegister = async () => {
    setIsLoading(true);
    try {
      initialState
        ?.filter((v: any) => v?.required == true)
        ?.map((val: any) => {
          if (!payload?.[val?.value]) {
            return setErrorMessage(`Harap lengkapi ${val?.label}`);
          }
        });
      const result = await axios.post(
        CONFIG.base_url_api + `/user/create`,
        payload,
        {
          headers: {
            access_token: CONFIG.access_token,
          },
        },
      );
      if (data) {
        setIsLoading(false);
        Alert.alert('Berhasil Mendaftar, Silahkan Login!');
        setIsLogin(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const [refresh, setRefresh] = useState<boolean>(false);
  const onRefresh = async () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };

  return (
    <ScrollView
      style={{backgroundColor: 'white'}}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
      }>
      <View
        style={{
          width: '100%',
          height: normalize(150),
          backgroundColor: COLOR.darkGreen,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../../assets/images/logo_icon.png')}
          style={{
            width: normalize(100),
            height: normalize(100),
            marginTop: normalize(-15),
          }}
        />
      </View>
      {isLogin && (
        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            elevation: 5,
            marginTop: normalize(-10),
            paddingTop: normalize(100),
            height: heightScreen,
          }}>
          <View
            style={{
              paddingHorizontal: normalize(50),
            }}>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: normalize(24),
                fontWeight: 'bold',
              }}>
              Login Email
            </Text>
            <Text
              style={{
                color: COLOR.darkGrey,
                textAlign: 'center',
                fontSize: normalize(14),
              }}>
              Kamu akan menerima Kode OTP melalui Email.{`\n`}Login Kode OTP
              untuk verifikasi akumu.
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                marginTop: normalize(30),
              }}>
              <TextInput
                placeholder="Email"
                value={payload?.email}
                style={{
                  paddingLeft: normalize(20),
                  height: normalize(40),
                  color: COLOR.darkGrey,
                }}
                placeholderTextColor={COLOR.darkGrey}
                onChangeText={e => setPayload({email: e})}
              />
            </View>
            {errorMessage && (
              <Text style={{color: COLOR.red, marginLeft: normalize(20)}}>
                {errorMessage}
              </Text>
            )}

            <TouchableOpacity
              onPress={() => {
                setIsLogin(false);
                setPayload(null);
                setErrorMessage('');
              }}
              style={{
                marginTop: normalize(20),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'black'}}>
                Belum memiliki akun? Daftar disini
              </Text>
            </TouchableOpacity>

            <View style={{marginTop: normalize(20)}}>
              <Text style={{textAlign: 'center', color: 'black'}}>
                Dengan melanjutkan, kamu setuju dengan{' '}
                <TouchableOpacity>
                  <Text
                    style={{
                      textDecorationStyle: 'solid',
                      textDecorationLine: 'underline',
                      color: 'black',
                    }}>
                    Ketentuan Pengguna dan
                  </Text>
                </TouchableOpacity>{' '}
                <TouchableOpacity>
                  <Text
                    style={{
                      textDecorationStyle: 'solid',
                      textDecorationLine: 'underline',
                      color: 'black',
                    }}>
                    Kebijakan Privasi
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: normalize(50),
              marginTop: normalize(20),
            }}>
            <TouchableOpacity
              onPress={onLogin}
              disabled={isLoading}
              style={{
                backgroundColor: '#4bba4e',
                height: normalize(50),
                width: '100%',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {isLoading ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                <Text style={{color: 'white', fontSize: normalize(20)}}>
                  Kirim OTP
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!isLogin && (
        <View
          style={{
            paddingHorizontal: normalize(50),
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            elevation: 5,
            marginTop: normalize(-20),
            paddingTop: normalize(130),
            flex: 2,
            height: heightScreen,
          }}>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: normalize(18),
            }}>
            Selamat Datang di
          </Text>
          <Text
            style={{
              color: 'black',
              textAlign: 'center',
              fontSize: normalize(24),
              fontWeight: 'bold',
            }}>
            LEASFUND
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              marginTop: normalize(30),
            }}>
            <TextInput
              placeholder="No Telepon"
              value={payload?.phone}
              keyboardType="number-pad"
              onChangeText={e => {
                setPayload({...payload, phone: e});
              }}
              style={{
                paddingLeft: normalize(20),
                height: normalize(40),
                color: COLOR.darkGrey,
              }}
              placeholderTextColor={COLOR.darkGrey}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              marginTop: normalize(20),
            }}>
            <TextInput
              placeholder="Email"
              value={payload?.email}
              onChangeText={e => {
                setPayload({...payload, email: e});
              }}
              style={{
                paddingLeft: normalize(20),
                height: normalize(40),
                color: COLOR.darkGrey,
              }}
              placeholderTextColor={COLOR.darkGrey}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 10,
              marginTop: normalize(20),
            }}>
            <TextInput
              placeholder="Kode Referral (Jika Ada)"
              value={payload?.referral_code}
              onChangeText={e => {
                setPayload({...payload, referral_code: e});
              }}
              style={{
                paddingLeft: normalize(20),
                height: normalize(40),
                color: COLOR.darkGrey,
              }}
              placeholderTextColor={COLOR.darkGrey}
            />
          </View>
          {errorMessage && (
            <Text style={{color: COLOR.red, marginLeft: normalize(20)}}>
              {errorMessage}
            </Text>
          )}
          <TouchableOpacity
            onPress={onRegister}
            style={{
              backgroundColor: COLOR.default,
              height: normalize(50),
              width: '100%',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: normalize(20),
            }}>
            {isLoading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text style={{color: 'white'}}>Daftar Sekarang</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setIsLogin(true);
              setPayload(null);
              setErrorMessage('');
            }}
            style={{
              marginTop: normalize(20),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'black'}}>
              Sudah memiliki akun? Masuk disini
            </Text>
          </TouchableOpacity>

          <View style={{marginTop: normalize(20)}}>
            <Text style={{textAlign: 'center', color: 'black'}}>
              Dengan melanjutkan, kamu setuju dengan{' '}
              <TouchableOpacity>
                <Text
                  style={{
                    textDecorationStyle: 'solid',
                    textDecorationLine: 'underline',
                    color: 'black',
                  }}>
                  Ketentuan Pengguna dan
                </Text>
              </TouchableOpacity>{' '}
              <TouchableOpacity>
                <Text
                  style={{
                    textDecorationStyle: 'solid',
                    textDecorationLine: 'underline',
                    color: 'black',
                  }}>
                  Kebijakan Privasi
                </Text>
              </TouchableOpacity>
            </Text>
          </View>
          <Text
            style={{
              color: COLOR.darkGrey,
              textAlign: 'center',
              fontSize: normalize(12),
              marginTop: normalize(50),
            }}>
            PT. Leasfund Teknologi Solusi {`\n`} v1.1.1
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

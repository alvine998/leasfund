import {
  Alert,
  Dimensions,
  Image,
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

export default function Login({navigation}: any) {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const heightScreen = Dimensions.get('screen').height;

  const [data, setData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const initialState = [
    {value: 'phone', label: 'No Telepon', required: true},
    {value: 'email', label: 'Email', required: true},
    {value: 'referral_code', label: 'Kode Referal', required: false},
  ];

  useEffect(() => {
    setData(null);
  }, []);

  const onLogin = async () => {
    try {
      if (!data) {
        return setErrorMessage('Harap lengkapi no telepon');
      }
      const register: any = await AsyncStorage.getItem('register');

      if (data?.phone !== JSON.parse(register)?.phone) {
        return setErrorMessage('No telepon tidak terdaftar');
      }
      const result = await AsyncStorage.setItem('login', JSON.stringify(data));
      Alert.alert('Berhasil Masuk, Silahkan Konfirmasi OTP');
      navigation.navigate('ConfirmOTP');
    } catch (error) {
      console.log(error);
    }
  };

  const onRegister = async () => {
    try {
      initialState
        ?.filter((v: any) => v?.required == true)
        ?.map((val: any) => {
          if (!data?.[val?.value]) {
            return setErrorMessage(`Harap lengkapi ${val?.label}`);
          }
        });

      const result = await AsyncStorage.setItem(
        'register',
        JSON.stringify({...data, otp: '123456'}),
      );
      Alert.alert('Berhasil Mendaftar');
      setIsLogin(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
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
          style={{width: normalize(100), height: normalize(100)}}
        />
      </View>
      {isLogin && (
        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            elevation: 3,
            marginTop: normalize(100),
            height: heightScreen,
          }}>
          <View
            style={{
              paddingHorizontal: normalize(50),
            }}>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 20,
                marginTop: normalize(30),
              }}>
              <TextInput
                placeholder="No Telepon"
                value={data?.phone}
                style={{
                  paddingLeft: normalize(20),
                  height: normalize(40),
                  color: COLOR.darkGrey,
                }}
                placeholderTextColor={COLOR.darkGrey}
                onChangeText={e => setData({phone: e})}
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
                setData(null);
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
              paddingHorizontal: normalize(20),
              marginTop: normalize(250),
            }}>
            <TouchableOpacity
              onPress={onLogin}
              style={{
                backgroundColor: '#4bba4e',
                height: normalize(50),
                width: '100%',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: normalize(20)}}>
                Masuk
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!isLogin && (
        <View
          style={{
            paddingHorizontal: normalize(50),
            backgroundColor: 'white',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            elevation: 3,
            marginTop: normalize(20),
            height: heightScreen,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 20,
              marginTop: normalize(30),
            }}>
            <TextInput
              placeholder="No Telepon"
              value={data?.phone}
              keyboardType='number-pad'
              onChangeText={e => {
                setData({...data, phone: e});
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
              borderRadius: 20,
              marginTop: normalize(20),
            }}>
            <TextInput
              placeholder="Email"
              value={data?.email}
              onChangeText={e => {
                setData({...data, email: e});
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
              borderRadius: 20,
              marginTop: normalize(20),
            }}>
            <TextInput
              placeholder="Kode Referral (Jika Ada)"
              value={data?.referral_code}
              onChangeText={e => {
                setData({...data, referral_code: e});
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
              height: normalize(35),
              width: '100%',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: normalize(20),
            }}>
            <Text style={{color: 'white'}}>Daftar Sekarang</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setIsLogin(true);
              setData(null);
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
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

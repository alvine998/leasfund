import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import normalize from 'react-native-normalize';

export default function Login() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <View>
      <View
        style={{
          backgroundColor: '#4bba4e',
          width: '100%',
          height: normalize(450),
        }}></View>
      {isLogin && (
        <View style={{paddingHorizontal: normalize(50)}}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 20,
              marginTop: normalize(30),
            }}>
            <TextInput
              placeholder="No Telepon"
              style={{paddingLeft: normalize(20), height: normalize(40)}}
            />
          </View>
          <TouchableOpacity
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

          <TouchableOpacity
            onPress={() => setIsLogin(false)}
            style={{
              marginTop: normalize(20),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>Belum memiliki akun? Daftar disini</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isLogin && (
        <View style={{paddingHorizontal: normalize(50)}}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 20,
              marginTop: normalize(30),
            }}>
            <TextInput
              placeholder="No Telepon"
              style={{paddingLeft: normalize(20), height: normalize(40)}}
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
              style={{paddingLeft: normalize(20), height: normalize(40)}}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 20,
              marginTop: normalize(20),
            }}>
            <TextInput
              placeholder="Kode Referral"
              style={{paddingLeft: normalize(20), height: normalize(40)}}
            />
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#4bba4e',
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
            onPress={() => setIsLogin(true)}
            style={{
              marginTop: normalize(20),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>Sudah memiliki akun? Masuk disini</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={{marginTop: normalize(20)}}>
        <Text style={{textAlign: 'center'}}>
          Dengan melanjutkan, kamu setuju dengan{' '}
          <TouchableOpacity>
            <Text
              style={{
                textDecorationStyle: 'solid',
                textDecorationLine: 'underline'
              }}>
              Ketentuan Penggunaan dan
            </Text>
          </TouchableOpacity>
          {" "}
          <TouchableOpacity>
            <Text
              style={{
                textDecorationStyle: 'solid',
                textDecorationLine: 'underline',
              }}>
              Kebijakan Privasi
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

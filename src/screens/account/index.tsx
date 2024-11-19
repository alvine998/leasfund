import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import normalize from 'react-native-normalize';
import {COLOR} from '../../utils/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {CONFIG} from '../../config';
import Clipboard from '@react-native-clipboard/clipboard';

export default function Account({navigation}: any) {
  const [data, setData] = useState<any>();
  const getData = async () => {
    let result: any = await AsyncStorage.getItem('login');
    if (result) {
      result = JSON.parse(result);
      const user = await axios.get(
        CONFIG.base_url_api + `/user/list?email=${result?.email}`,
        {
          headers: {
            access_token: CONFIG.access_token,
          },
        },
      );
      setData(user?.data?.items[0]);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  let tabs = [
    {
      name: 'Kode Referral',
      icon: 'share-alt',
      href: '',
      copy: true,
      balance: false,
      text: data?.referral_code,
    },
    {
      name: 'Saldo Tersedia',
      icon: 'wallet',
      href: '',
      copy: false,
      balance: true,
      text: data?.balance || 0,
    },
    {
      name: 'Tentang Kami',
      icon: 'user-friends',
      href: 'AboutUs',
      copy: false,
      balance: false,
      text: '',
    },
    {
      name: 'Syarat Ketentuan',
      icon: 'clipboard-list',
      href: 'Term',
      copy: false,
      balance: false,
      text: '',
    },
    {
      name: 'Kebijakan Privasi',
      icon: 'user-shield',
      href: 'Privacy',
      copy: false,
      balance: false,
      text: '',
    },
    {
      name: 'Logout',
      icon: 'sign-out-alt',
      href: 'Login',
      copy: false,
      balance: false,
      text: '',
    },
  ];
  const [refresh, setRefresh] = useState<boolean>(false);

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      getData();
      setRefresh(false);
    }, 2000);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
      }
      style={{
        paddingHorizontal: normalize(20),
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('EditProfile');
        }}
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginVertical: normalize(30),
          height: normalize(100),
          width: '100%',
          backgroundColor: COLOR.default,
          borderRadius: 10,
          flexDirection: 'row',
          paddingHorizontal: normalize(20),
          gap: normalize(20),
        }}>
        <View>
          {data?.photo ? (
            <Image
              source={{uri: data?.photo}}
              style={{
                width: normalize(80),
                height: normalize(80),
                borderRadius: 80,
              }}
            />
          ) : (
            <View
              style={{
                backgroundColor: COLOR.darkGrey,
                width: normalize(80),
                height: normalize(80),
                borderRadius: 80,
              }}
            />
          )}
          <View></View>
        </View>
        <View>
          <Text
            style={{
              fontSize: normalize(24),
              color: 'white',
            }}>
            {data?.name}
          </Text>
          <Text
            style={{
              fontSize: normalize(14),
              color: 'white',
            }}>
            {data?.email}
          </Text>
          <Text
            style={{
              fontSize: normalize(14),
              color: 'white',
            }}>
            {data?.phone}
          </Text>
        </View>
        <View style={{position: 'absolute', bottom: 6, right: 6}}>
          <FA5Icon name="pencil-alt" size={normalize(20)} color={'white'} />
        </View>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'column',
          gap: normalize(20),
        }}>
        {tabs?.map((val: any, i: number) => (
          <TouchableOpacity
            key={i}
            style={{
              padding: normalize(10),
              paddingHorizontal: normalize(20),
              width: '100%',
              height: normalize(45),
              borderRadius: 10,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: COLOR.gray,
              elevation: 5,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              gap: normalize(10),
            }}
            onPress={() => {
              val?.href ? navigation.navigate(val?.href) : {};
            }}>
            <View
              style={{
                flexDirection: 'row',
                gap: normalize(10),
                alignItems: 'center',
              }}>
              <FA5Icon
                size={normalize(20)}
                color={val?.name == 'Logout' ? COLOR.red : COLOR.darkGrey}
                name={val?.icon}
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: val?.name == 'Logout' ? COLOR.red : 'black',
                  fontSize: normalize(16),
                }}>
                {val?.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                gap: normalize(10),
                alignItems: 'center',
              }}>
              {val?.copy && (
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: normalize(20),
                    fontWeight: 'bold',
                  }}>
                  {val?.text}
                </Text>
              )}
              {val?.balance && (
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    fontSize: normalize(20),
                    fontWeight: 'bold',
                  }}>
                  Rp {val?.text}
                </Text>
              )}
              {!val?.balance && (
                <TouchableOpacity
                  onPress={() => {
                    Clipboard.setString(val?.text);
                  }}>
                  <FA5Icon
                    name={val?.copy ? 'copy' : 'chevron-right'}
                    size={normalize(20)}
                    color={'black'}
                  />
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {/* <View
        style={{
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
            elevation: 5,
          }}>
          <FA5Icon size={normalize(20)} color={COLOR.darkGrey} name="" />
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: normalize(20),
            }}>
            Kode Referral
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
            elevation: 5,
          }}
          onPress={() => {
            navigation.navigate('AboutUs');
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
            elevation: 5,
          }}
          onPress={() => {
            navigation.navigate('Term');
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
            borderRadius: 10,
            backgroundColor: 'white',
            borderWidth: 1,
            borderColor: COLOR.gray,
            elevation: 5,
          }}
          onPress={() => {
            navigation.navigate('Privacy');
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
            borderRadius: 10,
            backgroundColor: COLOR.red,
            borderWidth: 1,
            borderColor: COLOR.gray,
            elevation: 5,
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
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

import {
  Image,
  RefreshControl,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import normalize from 'react-native-normalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLOR} from '../../utils/color';
import BackButton from '../../components/BackButton';
import axios from 'axios';
import {CONFIG} from '../../config';
import QRCode from 'react-native-qrcode-svg';

export default function Card({navigation}: any) {
  const [refresh, setRefresh] = useState<boolean>(false);
  const [detail, setDetail] = useState<any>(null);
  const [path, setPath] = useState<string>('profile');

  const getData = async () => {
    let login: any = await AsyncStorage.getItem('login');
    login = JSON.parse(login);
    const result = await axios.get(
      CONFIG.base_url_api + `/user/list?email=${login?.email}`,
      {
        headers: CONFIG.headers,
      },
    );
    setDetail(result?.data?.items[0]);
  };

  useEffect(() => {
    getData();
  }, []);

  const ShareUrl = async () => {
    try {
      const url = 'https://leasfund.com';
      const result = await Share.share({
        message: `Check out this link: ${url}`,
        url, // Add this for platforms that support URLs natively (iOS).
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with specific activity type (iOS)
          console.log(`Shared with activity type: ${result.activityType}`);
        } else {
          // Shared successfully
          console.log('Content shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed by the user
        console.log('Share dismissed');
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      <View style={{padding: normalize(20)}}>
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
          <Text
            style={{
              fontSize: normalize(24),
              fontWeight: 'bold',
              color: 'white',
            }}>
            {detail?.name}
          </Text>
          <Text
            style={{
              fontSize: normalize(24),
              fontWeight: 'bold',
              color: 'white',
            }}>
            Referral: {detail?.referral_code}
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: normalize(20),
            marginTop: normalize(20),
          }}>
          <Text
            style={{
              color: COLOR.darkGrey,
              textAlign: 'left',
              fontSize: normalize(18),
              fontWeight: 'bold',
            }}>
            Telepon: {detail?.phone}
          </Text>
          <Text
            style={{
              color: COLOR.darkGrey,
              textAlign: 'left',
              fontSize: normalize(18),
              fontWeight: 'bold',
              marginTop: normalize(10),
            }}>
            Email: {detail?.email}
          </Text>
        </View>
        {path == 'profile' ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                width: '100%',
                marginTop: normalize(30),
                paddingHorizontal: normalize(20),
              }}>
              <TouchableOpacity
                style={{width: '50%'}}
                onPress={() => {
                  setPath('profile');
                }}>
                <Text
                  style={{
                    color: COLOR.blue,
                    fontSize: normalize(18),
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Profil
                </Text>
                <View
                  style={{
                    width: '100%',
                    height: normalize(1),
                    backgroundColor: COLOR.blue,
                    padding: 1,
                    marginTop: normalize(20),
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: '50%'}}
                onPress={() => {
                  setPath('invite');
                }}>
                <Text
                  style={{
                    color: COLOR.darkGrey,
                    fontSize: normalize(18),
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Ajak Teman
                </Text>
              </TouchableOpacity>
            </View>

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
            <View style={{marginTop: normalize(-185)}}>
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
            <View style={{marginLeft: normalize(50), marginTop: normalize(25)}}>
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
            <View
              style={{marginLeft: normalize(-183), marginTop: normalize(-1)}}>
              <Image
                source={{
                  uri: 'https://firebasestorage.googleapis.com/v0/b/leasefund.appspot.com/o/Untitled%201%20(1).png?alt=media&token=650e4bcc-a605-4af3-a705-9fed3b8a80e0',
                }}
                style={{width: normalize(45), height: normalize(45)}}
              />
            </View>
          </View>
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                width: '100%',
                marginTop: normalize(30),
                paddingHorizontal: normalize(20),
              }}>
              <TouchableOpacity
                style={{width: '50%'}}
                onPress={() => {
                  setPath('profile');
                }}>
                <Text
                  style={{
                    color: COLOR.darkGrey,
                    fontSize: normalize(18),
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Profil
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{width: '50%'}}
                onPress={() => {
                  setPath('invite');
                }}>
                <Text
                  style={{
                    color: COLOR.blue,
                    fontSize: normalize(18),
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Ajak Teman
                </Text>
                <View
                  style={{
                    width: '100%',
                    height: normalize(1),
                    backgroundColor: COLOR.blue,
                    padding: 1,
                    marginTop: normalize(20),
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={{marginTop: normalize(40)}}>
              <QRCode
                value="https://leasfund.vercel.app/"
                size={200}
                backgroundColor="white"
                color="black"
              />
            </View>

            <View style={{marginTop: normalize(20)}}>
              <TouchableOpacity
                onPress={ShareUrl}
                style={{
                  backgroundColor: COLOR.blue,
                  width: normalize(250),
                  borderRadius: 10,
                  padding: normalize(10),
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Bagikan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

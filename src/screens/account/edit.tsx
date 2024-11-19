import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackButton from '../../components/BackButton';
import normalize from 'react-native-normalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {CONFIG} from '../../config';
import {COLOR} from '../../utils/color';
import Input from '../../components/Input';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  CameraOptions,
} from 'react-native-image-picker';

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB in bytes

export default function EditProfile({navigation}: any) {
  const [data, setData] = useState<any>();
  const [selectImage, setSelectImage] = useState<any>(data?.photo || '');
  const [selectImageKtp, setSelectImageKtp] = useState<any>(data?.ktp || '');
  const uploadFirebase = async (key: string, image: any) => {
    try {
      const formData = new FormData();
      formData.append('file', {uri: image, name: "image/jpg", type: "image/jpeg"});
      const result = await axios.post(
        CONFIG.base_url_api + '/upload/image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        },
      );
      if (key == 'photo') {
        return setSelectImage(result?.data?.url);
      }
      if (key == 'ktp') {
        return setSelectImageKtp(result?.data?.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openCamera = async (key: string) => {
    try {
      const result: any = await launchCamera({
        mediaType: 'photo',
        saveToPhotos: true,
        quality: 1,
      });
      if (result.errorCode) {
        ToastAndroid.show('Error: ' + result.errorMessage, ToastAndroid.SHORT);
      }
      if (result?.assets) {
        if (result?.assets[0]?.fileSize > MAX_FILE_SIZE) {
          return ToastAndroid.show('Maks file 2 MB', ToastAndroid.SHORT);
        }
        return uploadFirebase(key, result?.assets[0]?.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openGallery = async (key: string) => {
    try {
      const result: any = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });
      if (result.errorCode) {
        ToastAndroid.show('Error: ' + result.errorMessage, ToastAndroid.SHORT);
      }
      if (result?.assets) {
        if (result?.assets[0]?.fileSize > MAX_FILE_SIZE) {
          return ToastAndroid.show('Maks file 2 MB', ToastAndroid.SHORT);
        }
        return uploadFirebase(key, result?.assets[0]?.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChooseOption = (key: string) => {
    Alert.alert(
      'Select Option',
      'Choose an option to get your image',
      [
        {text: 'Camera', onPress: () => openCamera(key)},
        {text: 'Gallery', onPress: () => openGallery(key)},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

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

  const updateProfile = async () => {
    try {
      const result = await axios.put(
        CONFIG.base_url_api + '/user/update/' + data?.uuid,
        {...data, photo: selectImage, ktp: selectImageKtp},
        {
          headers: CONFIG.headers,
        },
      );
      ToastAndroid.show('Berhasil edit data', ToastAndroid.SHORT);
      getData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View
      style={{
        padding: normalize(20),
      }}>
      <BackButton navigation={navigation} />
      <ScrollView>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: normalize(40),
          }}>
          {selectImage ? (
            <TouchableOpacity
              onPress={() => {
                handleChooseOption('photo');
              }}
              style={{
                width: normalize(100),
                height: normalize(100),
                borderRadius: 100,
                backgroundColor: COLOR.darkGrey,
              }}>
              <Image
                source={{uri: selectImage}}
                style={{
                  width: normalize(100),
                  height: normalize(100),
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                handleChooseOption('photo');
              }}
              style={{
                width: normalize(100),
                height: normalize(100),
                borderRadius: 100,
                backgroundColor: COLOR.darkGrey,
              }}></TouchableOpacity>
          )}
          <View style={{width: '100%'}}>
            <Input
              placeholder={'Masukkan Nama'}
              value={data?.name}
              onChange={(e: any) => {
                setData({...data, name: e});
              }}
              label="Nama"
            />

            <Input
              placeholder={'Masukkan Email'}
              value={data?.email}
              onChange={(e: any) => {
                setData({...data, email: e});
              }}
              label="Email"
            />

            <Input
              placeholder={'Masukkan No Telepon'}
              value={data?.phone}
              onChange={(e: any) => {
                setData({...data, phone: e});
              }}
              label="No Telepon"
            />

            <Text
              style={{
                fontSize: normalize(18),
                color: 'black',
                marginLeft: normalize(10),
                fontWeight: 'bold',
                marginTop: normalize(20),
              }}>
              KTP
            </Text>
            {selectImageKtp ? (
              <TouchableOpacity
                disabled={data?.photo}
                onPress={() => {
                  handleChooseOption('ktp');
                }}
                style={{
                  width: '100%',
                  borderWidth: 1,
                  borderRadius: 10,
                  height: normalize(150),
                  marginTop: normalize(10),
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: normalize(40),
                }}>
                <Image
                  source={{uri: selectImageKtp}}
                  style={{
                    width: '100%',
                    height: normalize(120),
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  handleChooseOption('ktp');
                }}
                style={{
                  width: '100%',
                  borderWidth: 1,
                  borderRadius: 10,
                  height: normalize(150),
                  marginTop: normalize(20),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesome5Icon
                  name="address-card"
                  size={normalize(40)}
                  color={COLOR.darkGreen}
                />
                <Text
                  style={{
                    color: COLOR.darkGrey,
                    fontSize: normalize(16),
                    marginTop: normalize(10),
                  }}>
                  Upload Foto KTP
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={updateProfile}
              style={{
                backgroundColor: COLOR.default,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: normalize(40),
                borderRadius: 10,
                marginTop: normalize(20),
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: normalize(16),
                }}>
                Simpan
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

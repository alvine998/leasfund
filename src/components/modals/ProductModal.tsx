import {
    Alert,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Modals from '../Modal';
import normalize from 'react-native-normalize';
import {COLOR} from '../../utils/color';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import Input from '../Input';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

interface Props {
  options?: any[];
  modal: any;
  setModal: any;
  selected?: any;
  setSelected?: any;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB in bytes

export default function ProductModal({
  options,
  modal,
  setModal,
  selected,
  setSelected,
}: Props) {
  const [data, setData] = useState<any>(options);
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
        //   return uploadFirebase(key, result?.assets[0]?.uri);
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
        //   return uploadFirebase(key, result?.assets[0]?.uri);
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

  return (
    <Modals modal={modal.open} setModal={setModal}>
      <View
        style={{
          flexDirection: 'row',
          gap: normalize(80),
          alignItems: 'center',
        }}>
        <Text style={{color: COLOR.darkGrey, fontSize: normalize(20)}}>
          Tambah Produk
        </Text>
        <TouchableOpacity
          onPress={() => {
            setModal({...modal, open: false});
          }}>
          <FA5Icon name="times" color={'black'} size={normalize(24)} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{
          height: normalize(550),
          width: '100%',
          marginTop: normalize(20),
        }}>
        <Input
          onChange={(e: any) => {}}
          placeholder={'Masukan Nama Produk'}
          value={''}
          isRequired
          label="Produk"
        />
        <Input
          onChange={(e: any) => {}}
          placeholder={'Masukan Kode'}
          value={''}
          isRequired
          label="Kode"
        />
        <Input
          onChange={(e: any) => {}}
          placeholder={'Masukan Deskripsi'}
          value={''}
          isRequired
          label="Deskripsi"
        />
        <Text
          style={{
            fontSize: normalize(18),
            color: 'black',
            marginLeft: normalize(10),
            fontWeight: 'bold',
            marginTop: normalize(20),
          }}>
          Logo
        </Text>
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
            Upload Logo
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Modals>
  );
}

const styles = StyleSheet.create({});

import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import normalize from 'react-native-normalize';
import {COLOR} from '../../utils/color';
import axios from 'axios';
import {CONFIG} from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useSession from '../../hooks/useSession';
import ProductModal from '../../components/modals/ProductModal';

export default function Product({navigation}: any) {
  const [products, setProducts] = useState<any>([]);
  const {user} = useSession();
  const [modal, setModal] = useState<any>({open: false, data: null});
  const getProduct = async () => {
    try {
      const result = await axios.get(CONFIG.base_url_api + `/product/list`, {
        headers: CONFIG.headers,
      });
      setProducts(result?.data?.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  const [refresh, setRefresh] = useState<boolean>(false);
  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      getProduct();
      setRefresh(false);
    }, 2000);
  };

  const handleLongPress = (key: string) => {
    Alert.alert(
      'Select Option',
      'Choose an option',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Edit',
          onPress: () => setModal({...modal, open: true, data: key}),
        },
        {
          text: 'Hapus',
          onPress: () => setModal({...modal, open: true, data: key}),
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
      }
      style={{padding: normalize(20)}}>
      <Text
        style={{color: 'black', fontSize: normalize(20), textAlign: 'center'}}>
        Mitra Produk Kami
      </Text>
      <View
        style={{marginVertical: normalize(20), marginBottom: normalize(80)}}>
        {user?.role == 'admin' && (
          <TouchableOpacity
            onPress={() => {
              setModal({open: true, data: null});
            }}
            style={{
              backgroundColor: COLOR.default,
              width: '100%',
              height: normalize(40),
              borderRadius: 10,
              marginTop: normalize(10),
              paddingHorizontal: normalize(20),
              paddingVertical: normalize(5),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: normalize(20), color: 'white'}}>
              Tambah Produk
            </Text>
          </TouchableOpacity>
        )}
        {products?.map((v: any, i: number) => (
          <TouchableOpacity
            key={i}
            onLongPress={() => {
              handleLongPress(v?.uuid);
            }}
            onPress={() => {
              AsyncStorage.setItem('walkby', 'product');
              AsyncStorage.setItem(
                'leasing',
                JSON.stringify({uuid: v?.uuid, name: v?.name, code: v?.code}),
              );
              navigation.navigate('DetailProduct');
            }}
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: normalize(100),
              borderRadius: 20,
              marginTop: normalize(10),
              paddingHorizontal: normalize(20),
              paddingVertical: normalize(10),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{fontSize: normalize(20), color: 'black'}}>
                {v?.name}
              </Text>
              <Text
                style={{
                  fontSize: normalize(10),
                  color: 'black',
                  width: normalize(200),
                }}>
                {v?.description}
              </Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={{uri: v?.logo}}
                style={{
                  width:
                    v?.code == 'ADIRA01' ||
                    v?.code == 'KP01' ||
                    v?.code == 'BF01'
                      ? normalize(100)
                      : normalize(50),
                  height:
                    v?.code == 'ADIRA01' ||
                    v?.code == 'KP01' ||
                    v?.code == 'BF01'
                      ? normalize(25)
                      : normalize(50),
                }}
              />
              <Text
                style={{
                  color: COLOR.blue,
                  marginTop: normalize(10),
                  fontWeight: 'bold',
                }}>
                Pilih Mitra
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        {modal.open && <ProductModal modal={modal} setModal={setModal} />}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

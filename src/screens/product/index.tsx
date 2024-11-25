import {
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

export default function Product({navigation}: any) {
  const [products, setProducts] = useState<any>([]);
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
      <View style={{marginVertical: normalize(20)}}>
        {products?.map((v: any, i: number) => (
          <TouchableOpacity
            key={i}
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
                  fontSize: normalize(14),
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
                  width: v?.code == 'ADIRA01' ? normalize(100) : normalize(50),
                  height: v?.code == 'ADIRA01' ? normalize(25) : normalize(50),
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

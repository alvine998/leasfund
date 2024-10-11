import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import normalize from 'react-native-normalize';

export default function Card() {
  const [refresh, setRefresh] = useState<boolean>(false);

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
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          marginTop: normalize(50),
        }}>
        <Image
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/leasefund.appspot.com/o/card%2Fwww.leasfund.com.png?alt=media&token=fdb0db5f-b510-4db1-aa47-707317ca5b97',
          }}
          style={{
            width: normalize(350),
            height: normalize(200),
            borderRadius: 20,
          }}
        />

        <Image
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/leasefund.appspot.com/o/card%2Fwww.leasfund.com%20(1).png?alt=media&token=d056f074-56be-4a97-9b92-af1c7ae64f8b',
          }}
          style={{
            width: normalize(350),
            height: normalize(200),
            borderRadius: 20,
            marginTop: normalize(20),
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
            Adrian Septian
          </Text>
        </View>
        <View style={{marginLeft: normalize(50), marginTop: normalize(25)}}>
          <Text
            style={{
              fontSize: normalize(12),
              fontWeight: '500',
              color: 'black',
              marginLeft: normalize(160),
            }}>
            0899-9999-0000
          </Text>
          <Text
            style={{
              fontSize: normalize(12),
              fontWeight: '500',
              color: 'black',
              marginLeft: normalize(160),
              marginTop: normalize(17),
            }}>
            adrianseptian@gmail.com
          </Text>
        </View>
        <View style={{marginLeft: normalize(-182), marginTop: normalize(-5)}}>
          <Image
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/leasefund.appspot.com/o/Untitled%201%20(1).png?alt=media&token=650e4bcc-a605-4af3-a705-9fed3b8a80e0',
            }}
            style={{width: normalize(45), height: normalize(45)}}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

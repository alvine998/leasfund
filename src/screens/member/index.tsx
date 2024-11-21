import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import normalize from 'react-native-normalize';
import BackButton from '../../components/BackButton';
import {COLOR} from '../../utils/color';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import Input from '../../components/Input';

export default function Member({navigation}: any) {
  const [refresh, setRefresh] = useState<boolean>(false);
  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  };
  return (
    <View style={{padding: normalize(20)}}>
      <BackButton navigation={navigation} />
      <Text
        style={{
          fontSize: normalize(24),
          color: 'black',
          textAlign: 'center',
          marginTop: normalize(20),
        }}>
        Rekan Bisnis
      </Text>
      <View style={{marginTop: normalize(0)}}>
        <Input
          placeholder={'Cari rekan  ...'}
          onChange={() => {}}
          value={''}
          isRequired
        />
      </View>
      <View
        style={{
          marginTop: normalize(20),
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: normalize(14),
            color: 'black',
          }}>
          Jumlah Rekan Bisnis: 9
        </Text>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: normalize(10),
            padding: normalize(10),
            borderWidth: 1,
            borderRadius: 20,
            borderColor: COLOR.darkGreen,
          }}>
          <FA5Icon name="sort" size={normalize(15)} color={'black'} />
          <Text
            style={{
              fontSize: normalize(14),
              color: 'black',
            }}>
            Urutkan
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{marginTop: normalize(20), marginBottom: normalize(70)}}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
        }>
        <TouchableOpacity
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundColor: 'white',
            marginTop: normalize(10),
            borderRadius: 10,
            padding: normalize(20),
            elevation: 5
          }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 5,
              backgroundColor: COLOR.default,
              padding: normalize(10),
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <Text
              style={{
                fontSize: normalize(14),
                color: 'white',
              }}>
              RB1
            </Text>
          </View>
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: normalize(18),
                fontWeight: '700',
              }}>
              Nanang Sumarna
            </Text>
            <Text style={{color: COLOR.darkGrey, fontSize: normalize(15)}}>
              Poin Mobil
            </Text>
            <Text style={{color: COLOR.darkGrey, fontSize: normalize(15)}}>
              Poin Motor
            </Text>
            <Text style={{color: COLOR.darkGrey, fontSize: normalize(15)}}>
              Total Poin
            </Text>
          </View>
          <View style={{}}>
            <Text
              style={{color: COLOR.darkGrey, fontSize: normalize(15)}}></Text>
            <Text style={{color: COLOR.darkGrey, fontSize: normalize(15)}}>
              0
            </Text>
            <Text style={{color: COLOR.darkGrey, fontSize: normalize(15)}}>
              0
            </Text>
            <Text style={{color: COLOR.darkGrey, fontSize: normalize(15)}}>
              0
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});

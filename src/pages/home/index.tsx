import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import normalize from 'react-native-normalize';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import FA5IconPro from 'react-native-vector-icons/FontAwesome5Pro';
import {COLOR} from '../../utils/color';

export default function Home() {
  const navs = [
    {
      name: 'Pelajari Produk',
      icon: 'book-open',
      href: '',
    },
    {
      name: 'Cari Nasabah',
      icon: 'search',
      href: '',
    },
    {
      name: 'Kelola Nasabah',
      icon: 'users',
      href: '',
    },
    {
      name: 'Member Tim',
      icon: 'user-friends',
      href: '',
    },
    {
      name: 'Pendapatan & Poin',
      icon: 'dollar-sign',
      href: '',
    },
    {
      name: 'Simulasi Cicilan',
      icon: 'clipboard',
      href: '',
    },
  ];

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
      <View style={styles.headerContainer}>
        <View style={styles.row}>
          <TouchableOpacity>
            <FA5Icon
              name="user-circle"
              size={normalize(50)}
              color={COLOR.blue}
            />
          </TouchableOpacity>
          <Text style={styles.name}>Halo, User Leasfund</Text>
        </View>
        <TouchableOpacity>
          <FA5Icon name="bell" size={normalize(30)} color={COLOR.blue} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={{fontSize: normalize(20), color: 'black'}}>
          Special Event
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{marginTop: normalize(10)}}>
          <TouchableOpacity style={styles.boxEvent}>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/leasefund.appspot.com/o/1600w-H2FBCwE-Os0.webp?alt=media&token=44a21f4e-cbde-4b66-a82d-af8f610d476c',
              }}
              style={{
                width: normalize(150),
                height: normalize(150),
                borderRadius: 20,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.boxEvent, {marginLeft: normalize(10)}]}>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/leasefund.appspot.com/o/1600w-H2FBCwE-Os0.webp?alt=media&token=44a21f4e-cbde-4b66-a82d-af8f610d476c',
              }}
              style={{
                width: normalize(150),
                height: normalize(150),
                borderRadius: 20,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.boxEvent, {marginLeft: normalize(10)}]}>
            <Image
              source={{
                uri: 'https://firebasestorage.googleapis.com/v0/b/leasefund.appspot.com/o/1600w-H2FBCwE-Os0.webp?alt=media&token=44a21f4e-cbde-4b66-a82d-af8f610d476c',
              }}
              style={{
                width: normalize(150),
                height: normalize(150),
                borderRadius: 20,
              }}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.boxBlue}>
          <View style={styles.row2}>
            <Text style={styles.text1}>Total Pendapatan</Text>
            <FA5Icon
              name="chevron-right"
              size={normalize(20)}
              color={'white'}
            />
          </View>
          <Text style={styles.text2}>Rp 0</Text>
        </TouchableOpacity>

        <View style={styles.row3}>
          {navs?.map((val: any, idx: number) => (
            <TouchableOpacity key={idx} style={styles.boxNav}>
              <FA5Icon
                name={val?.icon}
                size={normalize(30)}
                color={'#808080'}
              />
              <Text style={styles.text3}>{val?.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={{paddingHorizontal: normalize(20)}}>
        <TouchableOpacity style={styles.boxHelp}>
          <FA5Icon
            name={'info-circle'}
            size={normalize(30)}
            color={'#808080'}
          />
          <Text style={styles.textBoxHelp}>Q & A</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{paddingHorizontal: normalize(20), marginTop: normalize(20)}}>
        <TouchableOpacity style={styles.boxHelp}>
          <FA5Icon
            name={'hands-helping'}
            size={normalize(30)}
            color={'#808080'}
          />
          <Text style={styles.textBoxHelp}>Customer Service</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: normalize(10),
  },
  headerContainer: {
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  name: {
    fontSize: normalize(20),
    fontWeight: 'bold',
    marginLeft: normalize(20),
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  boxEvent: {
    backgroundColor: COLOR.default,
    width: normalize(150),
    height: normalize(150),
    borderRadius: 20,
  },
  boxBlue: {
    backgroundColor: COLOR.default,
    width: '100%',
    height: normalize(150),
    borderRadius: 20,
    paddingHorizontal: normalize(20),
    paddingVertical: normalize(20),
  },
  text1: {
    fontSize: normalize(20),
    fontWeight: '400',
    color: 'white',
  },
  text2: {
    fontSize: normalize(30),
    fontWeight: 'bold',
    color: 'white',
    marginTop: normalize(30),
  },
  row2: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  row3: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: normalize(20),
  },
  boxNav: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLOR.darkGrey,
    margin: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text3: {
    fontSize: normalize(14),
    fontWeight: '400',
    color: '#808080',
    textAlign: 'center',
    marginTop: normalize(10),
  },
  boxHelp: {
    width: '100%',
    height: normalize(100),
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLOR.darkGrey,
  },
  textBoxHelp: {
    fontSize: normalize(20),
    fontWeight: '400',
    color: 'black',
    textAlign: 'center',
    marginLeft: normalize(10),
  },
});

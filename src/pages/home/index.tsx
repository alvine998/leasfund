import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
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
  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <View style={styles.row}>
          <TouchableOpacity>
            <FA5Icon name="user-circle" size={normalize(50)} />
          </TouchableOpacity>
          <Text style={styles.name}>Halo, User Leasfund</Text>
        </View>
        <TouchableOpacity>
          <FA5Icon name="bell" size={normalize(30)} />
        </TouchableOpacity>
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
    backgroundColor: COLOR.gray,
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
    marginTop: normalize(20)
  },
  boxNav: {
    width: normalize(100),
    height: normalize(100),
    borderRadius: 20,
    backgroundColor: '#dfdfdf',
    margin: normalize(10),
    alignItems:"center",
    justifyContent: "center"
  },
  text3: {
    fontSize: normalize(14),
    fontWeight: '400',
    color: '#808080',
    textAlign: 'center',
    marginTop: normalize(10)
  },
});

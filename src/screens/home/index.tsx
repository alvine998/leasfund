import {
  Alert,
  BackHandler,
  Dimensions,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import normalize from 'react-native-normalize';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Entcon from 'react-native-vector-icons/Entypo';
import FontIcon from 'react-native-vector-icons/Fontisto';

import {COLOR} from '../../utils/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useFocusEffect,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';

export default function Home({navigation}: any) {
  const [detail, setDetail] = useState<any>(null);
  const [name, setName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [images, setImages] = useState<any>([]);
  const [show, setShow] = useState<boolean>(false);
  const colorScheme = useColorScheme();
  const widthScreen = Dimensions.get('screen').width;
  const navigationState = useNavigationState(state => state);
  const isAtHomeScreen =
    navigationState.routes[navigationState.index].name === 'BottomHome';

  const onAddName = async () => {
    try {
      if (!name) {
        return setErrorMessage('Harap lengkapi nama anda');
      }
      await AsyncStorage.setItem(
        'register',
        JSON.stringify({...detail, name: name}),
      );
      Alert.alert('Berhasil menambahkan nama');
      setModal(!modal);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   storage()
  //     .ref('/' + 'FA984B65-38D4-44B1-BF02-4E7EF089773B.jpg') //name in storage in firebase console
  //     .getDownloadURL()
  //     .then((url) => {
  //       setImageUrl(url);
  //     })
  //     .catch((e) => console.log('Errors while downloading => ', e));
  // }, []);

  const getData = async () => {
    const register: any = await AsyncStorage.getItem('register');
    const detail = JSON.parse(register);
    setDetail(detail);
    if (!detail?.name || detail?.name == '') {
      setModal(true);
    }
  };
  const [backPressCount, setBackPressCount] = useState<number>(0);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (backPressCount === 1) {
          // If back button pressed twice within 2 seconds, exit the app
          BackHandler.exitApp();
          return true; // Return true to prevent the default back action
        }

        // Show a toast message when back button is pressed the first time
        ToastAndroid.show('Tekan 2x untuk keluar', ToastAndroid.SHORT);
        setBackPressCount(1);

        // Reset the back press count after 2 seconds
        setTimeout(() => {
          setBackPressCount(0);
        }, 2000);

        return true; // Return true to prevent the default back action
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    }, [backPressCount, isAtHomeScreen]),
  );

  useEffect(() => {
    getData();
  }, []);
  const navs = [
    {
      name: 'Kelola Nasabah',
      icon: (
        <MIcon
          name="manage-search"
          color={COLOR.darkGreen}
          size={normalize(35)}
        />
      ),
      href: '',
    },
    {
      name: 'Member',
      icon: (
        <FA5Icon
          name="users"
          color={COLOR.darkGreen}
          size={normalize(35)}
        />
      ),
      href: '',
    },
    {
      name: 'Poin & Komisi',
      icon: (
        <Entcon
          name="wallet"
          color={COLOR.darkGreen}
          size={normalize(35)}
        />
      ),
      href: '',
    },
    {
      name: 'Simulasi Cicilan',
      icon: (
        <FontIcon
          name="calculator"
          color={COLOR.darkGreen}
          size={normalize(35)}
        />
      ),
      href: 'Simulation',
    },
  ];

  const [sliding, setSliding] = useState<number>(0);

  useEffect(() => {
    setTimeout(() => {}, 2000);
  }, []);

  const [refresh, setRefresh] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>();

  let banners = [
    'https://firebasestorage.googleapis.com/v0/b/leasefund.appspot.com/o/card%2FA.jpg?alt=media&token=8561e991-b7ee-4f5c-8df2-49f0bfee438e',
    'https://firebasestorage.googleapis.com/v0/b/leasefund.appspot.com/o/card%2FB.jpg?alt=media&token=3e192d99-74d0-4b16-b5c9-1282fe1b247f',
    'https://firebasestorage.googleapis.com/v0/b/leasefund.appspot.com/o/card%2FSAMPUL%205.jpg?alt=media&token=84c20ac7-aea4-47b4-8b03-ca986411174f',
  ];

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
          <Text style={styles.name}>
            Halo, {detail?.name || 'User Leasfund'}
          </Text>
        </View>
        <TouchableOpacity>
          <FA5Icon name="bell" size={normalize(30)} color={COLOR.blue} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          backgroundColor: COLOR.darkGreen,
          height: normalize(250),
          borderBottomRightRadius: 50,
        }}></View>

      <View
        style={{
          marginTop: normalize(-230),
          marginBottom: normalize(20),
          paddingHorizontal: normalize(20),
        }}>
        <View
          style={{
            backgroundColor: 'white',
            width: '100%',
            height: normalize(50),
            padding: normalize(10),
            borderRadius: 20,
            flexDirection: 'row',
            gap: normalize(20),
            alignItems: 'center',
            paddingLeft: normalize(20),
          }}>
          <FA5Icon name="search" size={normalize(20)} color={COLOR.darkGrey} />
          <TextInput
            placeholder="Cari Nasabah"
            style={{
              width: normalize(200),
              height: normalize(40),
              color: COLOR.darkGrey,
            }}
            placeholderTextColor={COLOR.darkGrey}
          />
        </View>
      </View>

      <View style={{paddingHorizontal: normalize(20)}}>
        <View style={styles.boxBlue}>
          <Text style={{color: 'white'}}>Total Komisi</Text>
          <View style={styles.row2}>
            <Text style={styles.text1}>
              Rp {show ? '1.000.000' : '********'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShow(!show);
              }}>
              <FA5Icon
                name={show ? 'eye' : 'eye-slash'}
                size={normalize(20)}
                color={'white'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{marginTop: normalize(10)}}>
        <ScrollView horizontal pagingEnabled style={{marginTop: normalize(10)}}>
          {banners?.map((v: any, i: number) => (
            <TouchableOpacity key={i} style={[styles.boxEvent]}>
              <Image
                source={{
                  uri: v,
                }}
                style={{
                  width: widthScreen,
                  height: normalize(170),
                }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={{paddingTop: normalize(20)}}>
        <View
          style={{
            backgroundColor: 'white',
            width: widthScreen,
            borderRadius: 10,
            padding: normalize(10),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: normalize(30),
          }}>
          <Text style={{color: COLOR.darkGrey}}>Booking NTF Amount</Text>
          <View>
            <View style={{flexDirection: 'row', gap: normalize(10)}}>
              <FA5Icon name="car" color={COLOR.blue} size={normalize(20)} />
              <Text style={{color: COLOR.darkGrey}}>0</Text>
            </View>
            <View style={{flexDirection: 'row', gap: normalize(10)}}>
              <FA5Icon
                name="motorcycle"
                color={COLOR.blue}
                size={normalize(20)}
              />
              <Text style={{color: COLOR.darkGrey}}>~ Rp 148 Juta</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'white',
            width: widthScreen,
            borderRadius: 10,
            padding: normalize(10),
            marginTop: normalize(10),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: normalize(30),
          }}>
          <Text style={{color: COLOR.darkGrey}}>Kontrak</Text>
          <View>
            <View style={{flexDirection: 'row', gap: normalize(10)}}>
              <FA5Icon name="car" color={COLOR.blue} size={normalize(20)} />
              <Text style={{color: COLOR.darkGrey}}>0</Text>
            </View>
            <View style={{flexDirection: 'row', gap: normalize(10)}}>
              <FA5Icon
                name="motorcycle"
                color={COLOR.blue}
                size={normalize(20)}
              />
              <Text style={{color: COLOR.darkGrey}}>10</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{paddingHorizontal: normalize(20)}}>
        <TouchableOpacity
          style={styles.boxCard}
          onPress={() => {
            navigation.navigate('Card');
          }}>
          <Text style={styles.textBoxCard}>Lihat Kartu Nama</Text>
          <FA5Icon
            name={'address-card'}
            size={normalize(30)}
            color={COLOR.darkGrey}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{paddingHorizontal: normalize(20), marginTop: normalize(10)}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: normalize(20),
          }}>
          {navs?.map((val: any, idx: number) => (
            <View key={idx}>
              <TouchableOpacity
                style={styles.boxNav}
                onPress={() => navigation.navigate(val?.href)}>
                {val?.icon}
                {/* <Image
                  source={{uri: val?.icon}}
                  style={{width: normalize(50), height: normalize(50)}}
                /> */}
              </TouchableOpacity>
              <Text style={styles.text3}>{val?.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          marginBottom: normalize(50),
          paddingHorizontal: normalize(20),
        }}>
        <TouchableOpacity style={styles.boxCard}>
          <FA5Icon
            name={'hands-helping'}
            size={normalize(30)}
            color={COLOR.blue}
          />
          <Text style={styles.textBoxHelp}>Customer Care</Text>
        </TouchableOpacity>
      </View>
      {modal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Selamat Datang, Mohon isi nama lengkap anda terlebih dahulu!
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 20,
                  marginTop: normalize(30),
                  width: '100%',
                }}>
                <TextInput
                  placeholder="Nama Lengkap"
                  value={name}
                  style={{paddingLeft: normalize(20), height: normalize(40), color: COLOR.darkGrey}}
                  placeholderTextColor={COLOR.darkGrey}
                  onChangeText={e => setName(e)}
                />
              </View>
              {errorMessage && (
                <Text
                  style={{
                    color: COLOR.red,
                    marginLeft: normalize(20),
                    textAlign: 'left',
                  }}>
                  {errorMessage}
                </Text>
              )}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={onAddName}>
                <Text style={styles.textStyle}>Simpan</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
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
    color: COLOR.darkGrey,
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  boxEvent: {
    backgroundColor: COLOR.default,
    width: Dimensions.get('screen').width,
    height: normalize(170),
    borderRadius: 20,
  },
  boxBlue: {
    backgroundColor: COLOR.default,
    width: '100%',
    height: normalize(70),
    borderRadius: 10,
    padding: normalize(10),
    paddingHorizontal: normalize(20),
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
    justifyContent: 'space-evenly',
    alignItems: 'baseline',
    flexDirection: 'row',
    marginTop: normalize(20),
    gap: normalize(10),
  },
  boxNav: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: 20,
    backgroundColor: 'white',
    margin: normalize(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text3: {
    fontSize: normalize(14),
    fontWeight: '400',
    color: COLOR.darkGrey,
    textAlign: 'center',
    width: normalize(60),
  },
  boxCard: {
    width: '100%',
    height: normalize(50),
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: normalize(20),
    elevation: 5,
  },
  textBoxCard: {
    fontSize: normalize(20),
    fontWeight: '400',
    color: 'black',
    textAlign: 'center',
    marginLeft: normalize(10),
    width: normalize(200),
  },
  boxHelp: {
    width: Dimensions.get('screen').width,
    height: normalize(60),
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: normalize(20),
  },
  textBoxHelp: {
    fontSize: normalize(18),
    fontWeight: '400',
    color: 'black',
    textAlign: 'center',
    marginLeft: normalize(10),
    width: normalize(150),
  },

  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(22),
    paddingHorizontal: normalize(20),
    flex: 1,
  },
  modalView: {
    margin: normalize(20),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: normalize(35),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    opacity: 30,
  },
  button: {
    borderRadius: 20,
    padding: normalize(10),
    elevation: 2,
    width: '100%',
    marginTop: normalize(20),
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: normalize(15),
    textAlign: 'center',
    color:"black"
  },
});

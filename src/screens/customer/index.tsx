import {
  Dimensions,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import normalize from 'react-native-normalize';
import BackButton from '../../components/BackButton';
import {COLOR} from '../../utils/color';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import Input from '../../components/Input';
import {PieChart} from 'react-native-chart-kit';
import moment from 'moment';
import DateModal from '../../components/modals/DateModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {CONFIG} from '../../config';

export default function Customer({navigation}: any) {
  const screenWidth = Dimensions.get('screen').width;
  const [selected, setSelected] = useState<string>('');
  const [date, setDate] = useState<{start: Date; end: Date}>({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    end: new Date(),
  });
  const [customers, setCustomers] = useState<any>([]);
  const [search, setSearch] = useState<string>('');
  const getData = async () => {
    try {
      const user: any = await AsyncStorage.getItem('login');
      const result = await axios.get(
        CONFIG.base_url_api +
          `/transaction/list?user_uuid=${JSON.parse(user)?.uuid}&status=${
            selected == 'all' ? '' : selected
          }&date_start=${moment(date?.start)?.format(
            'YYYY-MM-DD',
          )}&date_end=${moment(date?.end)?.format(
            'YYYY-MM-DD',
          )}&search=${search}`,
        {
          headers: CONFIG.headers,
        },
      );
      setCustomers(result?.data?.items);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [selected, date, search]);
  const [modal, setModal] = useState<{open: boolean; data?: any; key?: string}>(
    {open: false, data: null, key: ''},
  );
  const data = [
    {
      name: 'Menunggu',
      population: customers?.filter((val: any) => val?.status == 1)?.length,
      color: COLOR.yellow,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Proses',
      population: customers?.filter((val: any) => val?.status == 2)?.length,
      color: COLOR.blue,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Pencairan',
      population: customers?.filter((val: any) => val?.status == 3)?.length,
      color: COLOR.default,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Ditolak',
      population: customers?.filter((val: any) => val?.status == 4)?.length,
      color: COLOR.red,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Dibatalkan',
      population: customers?.filter((val: any) => val?.status == 5)?.length,
      color: COLOR.darkGrey,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const filters = [
    {value: '', label: 'Semua'},
    {value: '1', label: 'Menunggu'},
    {value: '2', label: 'Proses'},
    {value: '3', label: 'Pencairan'},
    {value: '4', label: 'Ditolak'},
    {value: '5', label: 'Dibatalkan'},
  ];

  const [refresh, setRefresh] = useState<boolean>(false);
  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      getData();
      setRefresh(false);
    }, 2000);
  };
  return (
    <View style={{padding: normalize(20)}}>
      <BackButton navigation={navigation} />
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
        }
        horizontal={false}>
        <View
          style={{
            marginTop: normalize(20),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setModal({...modal, open: true, data: null, key: 'date'});
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 20,
              borderColor: COLOR.default,
              padding: normalize(10),
              width: normalize(180),
              flexDirection: 'row',
              gap: normalize(10),
              backgroundColor: '#a6d4a2',
            }}>
            <FA5Icon
              name="calendar"
              color={COLOR.darkGrey}
              size={normalize(15)}
            />
            <Text
              style={{
                color: COLOR.darkGrey,
                fontSize: normalize(12),
                fontWeight: 'bold',
              }}>
              {moment(date?.start)?.format('DD-MM-YYYY')}
            </Text>
            <Text
              style={{
                color: COLOR.darkGrey,
                fontSize: normalize(12),
                fontWeight: 'bold',
              }}>
              - {moment(date?.end)?.format('DD-MM-YYYY')}
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontSize: normalize(24),
            color: 'black',
            textAlign: 'center',
            marginTop: normalize(20),
          }}>
          Daftar Prospek
        </Text>
        <View>
          <PieChart
            data={data}
            width={screenWidth - 50}
            height={normalize(150)}
            chartConfig={chartConfig}
            accessor={'population'}
            backgroundColor={'transparent'}
            paddingLeft={'0'}
            center={[10, 10]}
            absolute
          />
        </View>
        <View style={{marginTop: normalize(-20)}}>
          <Input
            placeholder={'Cari nasabah...'}
            onChange={(e: any) => {
              setSearch(e);
            }}
            value={search}
            isRequired
          />
        </View>
        <ScrollView horizontal>
          {filters?.map((v: any, i: number) => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                setSelected(v?.value);
              }}
              style={{
                padding: normalize(10),
                backgroundColor: v?.value == selected ? COLOR.default : 'white',
                borderRadius: 20,
                width: normalize(100),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: normalize(10),
                marginLeft: i !== 0 ? normalize(10) : 0,
                borderWidth: v?.value == selected ? 0 : 1,
              }}>
              <Text
                style={{
                  color: v?.value == selected ? 'white' : 'black',
                  fontWeight: 'bold',
                }}>
                {v?.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {customers?.length > 0 ? (
          <View>
            {customers?.map((val: any, idx: number) => (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  if (val?.status == 1) {
                    AsyncStorage.setItem(
                      'continue',
                      JSON.stringify({
                        customer_uuid: val?.customer_uuid,
                        customer_name: val?.customer_name,
                        leasing_uuid: val?.leasing_uuid,
                        leasing_name: val?.leasing_name,
                      }),
                    );
                    navigation.navigate('FormSubmission');
                  }
                }}
                style={{paddingBottom: normalize(50)}}>
                <View
                  style={{
                    width: '100%',
                    backgroundColor: 'white',
                    elevation: 5,
                    marginTop: normalize(10),
                    borderRadius: 10,
                    paddingBottom: normalize(20),
                  }}>
                  <View
                    style={{
                      borderBottomWidth: 2,
                      marginTop: normalize(10),
                      borderBottomColor: COLOR.gray,
                      paddingBottom: normalize(10),
                      paddingHorizontal: normalize(20),
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    {val?.status !== 1 && (
                      <View>
                        <View
                          style={{
                            padding: normalize(10),
                            backgroundColor: COLOR.yellow,
                            borderRadius: 20,
                            width: normalize(100),
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text style={{color: 'black', fontWeight: 'bold'}}>
                            {val?.status !== 1 ? 'Menunggu' : 'Processed'}
                          </Text>
                        </View>
                        <View>
                          <FA5Icon
                            name="car"
                            color={'black'}
                            size={normalize(30)}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      padding: normalize(10),
                      paddingHorizontal: normalize(20),
                    }}>
                    <View>
                      <Text
                        style={{
                          color: COLOR.darkGrey,
                          fontSize: normalize(20),
                        }}>
                        {val?.customer_name}
                      </Text>
                      <Text style={{color: COLOR.red, fontWeight: 'bold'}}>
                        {val?.loan_amount || '-'}
                      </Text>
                      {val?.status !== 1 && (
                        <View
                          style={{
                            marginTop: normalize(10),
                            flexDirection: 'row',
                            gap: normalize(10),
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              width: normalize(15),
                              height: normalize(15),
                              borderRadius: 20,
                              backgroundColor: COLOR.yellow,
                            }}
                          />
                          <Text style={{color: 'black'}}>Yellow</Text>
                        </View>
                      )}
                    </View>
                    <View>
                      <Text style={{color: COLOR.darkGrey}}>
                        {moment(val?.created_at).format('DD-MM-YYYY')}
                      </Text>
                      {val?.status == 1 ? (
                        <View />
                      ) : (
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('CustomerDetail');
                          }}
                          style={{
                            backgroundColor: COLOR.default,
                            padding: normalize(10),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            marginTop: normalize(10),
                          }}>
                          <Text style={{color: 'white', fontWeight: 'bold'}}>
                            Detail
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={{paddingVertical: normalize(20)}}>
            <Text style={{color: 'black', textAlign: 'center'}}>
              Belum ada data prospek{' '}
              {filters?.find((v: any) => v?.value == selected)?.label}
            </Text>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.setItem('walkby', 'prospek');
            AsyncStorage.setItem('continue', '');
            navigation.navigate('Product');
          }}
          style={{
            width: '100%',
            backgroundColor: COLOR.default,
            height: normalize(50),
            borderRadius: 10,
            // position: 'absolute',
            // bottom: normalize(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: normalize(18),
              fontWeight: 'bold',
            }}>
            Tambah Prospek
          </Text>
        </TouchableOpacity>
      </View>
      {modal.key == 'date' && (
        <DateModal
          modal={modal}
          setModal={setModal}
          selected={date}
          setSelected={setDate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});

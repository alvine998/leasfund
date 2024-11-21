import {
  Dimensions,
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
import {PieChart} from 'react-native-chart-kit';
import moment from 'moment';
import DateModal from '../../components/modals/DateModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Customer({navigation}: any) {
  const screenWidth = Dimensions.get('screen').width;
  const [selected, setSelected] = useState<string>('all');
  const [date, setDate] = useState<{start: string; end: string}>({
    start: moment().subtract(1, 'M').format('DD-MM-YYYY'),
    end: moment().format('DD-MM-YYYY'),
  });
  const [modal, setModal] = useState<{open: boolean; data?: any; key?: string}>(
    {open: false, data: null, key: ''},
  );
  const data = [
    {
      name: 'Proses',
      population: 0,
      color: COLOR.yellow,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Pencairan',
      population: 0,
      color: COLOR.default,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Ditolak',
      population: 0,
      color: COLOR.red,
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Dibatalkan',
      population: 0,
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
    {value: 'all', label: 'Semua'},
    {value: 'waiting', label: 'Menunggu'},
    {value: 'processed', label: 'Proses'},
    {value: 'disbursement', label: 'Pencairan'},
    {value: 'rejected', label: 'Ditolak'},
    {value: 'cancelled', label: 'Dibatalkan'},
  ];
  return (
    <View style={{padding: normalize(20)}}>
      <BackButton navigation={navigation} />
      <ScrollView horizontal={false}>
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
              {moment().subtract('M', 1).format('DD-MM-YYYY')}
            </Text>
            <Text
              style={{
                color: COLOR.darkGrey,
                fontSize: normalize(12),
                fontWeight: 'bold',
              }}>
              - {moment().format('DD-MM-YYYY')}
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
            onChange={() => {}}
            value={''}
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
        <View style={{paddingBottom: normalize(50)}}>
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
                  Processed
                </Text>
              </View>
              <View>
                <FA5Icon name="car" color={'black'} size={normalize(30)} />
              </View>
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
                <Text style={{color: COLOR.darkGrey, fontSize: normalize(20)}}>
                  Nanang Sumarna
                </Text>
                <Text style={{color: COLOR.red, fontWeight: 'bold'}}>
                  Rp 50.000.000
                </Text>
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
              </View>
              <View>
                <Text style={{color: COLOR.darkGrey}}>18-10-2024</Text>
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
              </View>
            </View>
          </View>
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
                  Processed
                </Text>
              </View>
              <View>
                <FA5Icon
                  name="motorcycle"
                  color={'black'}
                  size={normalize(30)}
                />
              </View>
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
                <Text style={{color: COLOR.darkGrey, fontSize: normalize(20)}}>
                  Nanang Sumarna
                </Text>
                <Text style={{color: COLOR.red, fontWeight: 'bold'}}>
                  Rp 50.000.000
                </Text>
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
                      backgroundColor: COLOR.red,
                    }}
                  />
                  <Text style={{color: 'black'}}>Red</Text>
                </View>
              </View>
              <View>
                <Text style={{color: COLOR.darkGrey}}>18-10-2024</Text>
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
              </View>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              backgroundColor: 'white',
              elevation: 5,
              marginTop: normalize(10),
              borderRadius: 10,
              paddingBottom: normalize(50),
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
                  Processed
                </Text>
              </View>
              <View>
                <FA5Icon name="car" color={'black'} size={normalize(30)} />
              </View>
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
                <Text style={{color: COLOR.darkGrey, fontSize: normalize(20)}}>
                  Nanang Sumarna
                </Text>
                <Text style={{color: COLOR.red, fontWeight: 'bold'}}>
                  Rp 50.000.000
                </Text>
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
                      backgroundColor: 'black',
                    }}
                  />
                  <Text style={{color: 'black'}}>Black</Text>
                </View>
              </View>
              <View>
                <Text style={{color: COLOR.darkGrey}}>18-10-2024</Text>
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
              </View>
            </View>
          </View>
        </View>
        {/* <ScrollView
        horizontal={false}
        style={{
          marginTop: normalize(20),
          marginBottom: normalize(70),
          height: normalize(370),
        }}>
       
      </ScrollView> */}
      </ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            AsyncStorage.setItem('walkby', 'prospek');
            navigation.navigate('Product');
          }}
          style={{
            width: '100%',
            backgroundColor: COLOR.default,
            height: normalize(50),
            borderRadius: 10,
            position: 'absolute',
            bottom: normalize(30),
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

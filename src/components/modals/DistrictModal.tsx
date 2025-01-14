import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modals from '../Modal';
import normalize from 'react-native-normalize';
import {COLOR} from '../../utils/color';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import Input from '../Input';
import axios from 'axios';

interface Props {
  modal: any;
  setModal: any;
  selected: any;
  setSelected: any;
}

export default function DistrictModal({
  modal,
  setModal,
  selected,
  setSelected,
}: Props) {
  const [province, setProvince] = useState<any>();
  const [city, setCity] = useState<any>();
  const [district, setDistrict] = useState<any>();
  const [village, setVillage] = useState<any>();
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getProvince = async () => {
    setLoading(true);
    try {
      const result = await axios.get(`https://api.tokotitoh.co.id/provinces`, {
        headers: {
          'bearer-token': 'tokotitohapi',
        },
      });
      setList(result?.data?.items?.rows);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getCity = async (province_id: number) => {
    setLoading(true);
    try {
      const result = await axios.get(
        `https://api.tokotitoh.co.id/cities?province_id=${province_id}`,
        {
          headers: {
            'bearer-token': 'tokotitohapi',
          },
        },
      );
      setList(result?.data?.items?.rows);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getDistrict = async (city_id: number) => {
    setLoading(true);
    try {
      const result = await axios.get(
        `https://api.tokotitoh.co.id/districts?city_id=${city_id}`,
        {
          headers: {
            'bearer-token': 'tokotitohapi',
          },
        },
      );
      setList(result?.data?.items?.rows);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getVillage = async (district_id: number) => {
    setLoading(true);
    try {
      const result = await axios.get(
        `https://api.tokotitoh.co.id/villages?district_id=${district_id}`,
        {
          headers: {
            'bearer-token': 'tokotitohapi',
          },
        },
      );
      setList(result?.data?.items?.rows);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProvince();
    setProvince(null);
    setCity(null);
    setDistrict(null);
    setVillage(null);
  }, []);
  return (
    <Modals modal={modal.open} setModal={setModal}>
      <View
        style={{
          flexDirection: 'row',
          gap: normalize(80),
          alignItems: 'center',
        }}>
        <Text style={{color: COLOR.darkGrey, fontSize: normalize(20)}}>
          {modal?.key == 'Kecamatan' ? 'Wilayah' : 'Alamat Sekarang'}
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
          height: normalize(350),
          width: '100%',
          marginTop: normalize(20),
        }}>
        {loading ? (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={'large'} color={COLOR.default} />
          </View>
        ) : (
          <View>
            {province?.id && (
              <TouchableOpacity
                onPress={() => {
                  if (village?.id) {
                    setVillage(null);
                    getVillage(district?.id);
                    return;
                  }
                  if (district?.id) {
                    setDistrict(null);
                    setVillage(null);
                    getDistrict(city?.id);
                    return;
                  }
                  if (city?.id) {
                    setCity(null);
                    setDistrict(null);
                    setVillage(null);
                    getCity(province?.id);
                    return;
                  }
                  if (province?.id) {
                    setProvince(null);
                    setCity(null);
                    setDistrict(null);
                    setVillage(null);
                    getProvince();
                    return;
                  }
                }}
                style={{
                  borderWidth: 1,
                  width: '100%',
                  marginTop: normalize(10),
                  borderRadius: 10,
                  paddingVertical: normalize(10),
                  backgroundColor: COLOR.red,
                  borderColor: COLOR.orange,
                }}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: normalize(18),
                  }}>
                  Kembali
                </Text>
              </TouchableOpacity>
            )}

            {list?.map((v: any, i: number) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  if (v?.district_id) {
                    setVillage(v);
                    setSelected({
                      ...selected,
                      geolocation: `${v?.name}, ${district?.name}, ${city?.name}, ${province?.name}`,
                    });
                    setModal({...modal, open: false});
                    return;
                  }
                  if (v?.city_id) {
                    setDistrict(v);
                    getVillage(v?.id);
                    return;
                  }
                  if (v?.province_id) {
                    setCity(v);
                    getDistrict(v?.id);
                    return;
                  }
                  setProvince(v);
                  getCity(v?.id);
                }}
                style={{
                  borderWidth: 1,
                  width: '100%',
                  marginTop: normalize(10),
                  borderRadius: 10,
                  paddingVertical: normalize(10),
                }}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: normalize(18),
                  }}>
                  {v?.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      {/* <View
        style={{
          marginTop: normalize(20),
          width: '100%',
        }}>
        <TouchableOpacity
          onPress={() => {
            setModal({...modal, open: false});
          }}
          style={{
            backgroundColor: COLOR.darkGreen,
            height: normalize(50),
            width: '100%',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: normalize(20)}}>Selesai</Text>
        </TouchableOpacity>
      </View> */}
    </Modals>
  );
}

const styles = StyleSheet.create({});

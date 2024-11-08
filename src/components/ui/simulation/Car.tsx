import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {useState} from 'react';
import normalize from 'react-native-normalize';
import {COLOR} from '../../../utils/color';
import Modals from '../../Modal';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import TypeModal from '../../modals/TypeModal';
import TenorModal from '../../modals/TenorModal';

export default function Car() {
  const [modal, setModal] = useState<{open: boolean; data?: any; key?: string}>(
    {open: false, data: null, key: ''},
  );
  const [selected, setSelected] = useState<any>();
  let types: any[] = [
    {
      id: 1,
      name: 'Daihatsu Sigra MT 2018',
    },
    {
      id: 2,
      name: 'Daihatsu Sigra MT 2018',
    },
    {
      id: 3,
      name: 'Daihatsu Sigra MT 2018',
    },
    {
      id: 4,
      name: 'Daihatsu Sigra MT 2018',
    },
    {
      id: 5,
      name: 'Daihatsu Sigra MT 2018',
    },
    {
      id: 6,
      name: 'Daihatsu Sigra MT 2018',
    },
    {
      id: 7,
      name: 'Daihatsu Sigra MT 2018',
    },
    {
      id: 8,
      name: 'Daihatsu Sigra MT 2018',
    },
  ];
  let tenors: any[] = [
    {
      value: 12,
      name: '12 Bulan',
    },
    {
      value: 18,
      name: '18 Bulan',
    },
    {
      value: 24,
      name: '24 Bulan',
    },
    {
      value: 36,
      name: '36 Bulan',
    },
  ];
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setModal({...modal, open: true, key: 'type'});
        }}
        style={{
          width: '100%',
          padding: normalize(10),
          borderRadius: 10,
          borderWidth: 1,
          paddingHorizontal: normalize(20),
          height: normalize(50),
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={{color: COLOR.darkGrey, fontSize: normalize(20)}}>
          {selected?.type_name || 'Pilih Jenis Kendaraan'}
        </Text>
        <FA5Icon
          name="chevron-down"
          size={normalize(20)}
          color={COLOR.darkGrey}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setModal({...modal, open: true, key: 'tenor'});
        }}
        style={{
          width: '100%',
          padding: normalize(10),
          borderRadius: 10,
          borderWidth: 1,
          paddingHorizontal: normalize(20),
          height: normalize(50),
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: normalize(20),
        }}>
        <Text style={{color: COLOR.darkGrey, fontSize: normalize(20)}}>
          {selected?.tenor_name || 'Pilih Tenor'}
        </Text>
        <FA5Icon
          name="chevron-down"
          size={normalize(20)}
          color={COLOR.darkGrey}
        />
      </TouchableOpacity>
      {modal.key == 'type' && (
        <TypeModal
          options={types}
          modal={modal}
          selected={selected}
          setModal={setModal}
          setSelected={setSelected}
        />
      )}
      {modal.key == 'tenor' && (
        <TenorModal
          options={tenors}
          modal={modal}
          selected={selected}
          setModal={setModal}
          setSelected={setSelected}
        />
      )}
    </View>
  );
}

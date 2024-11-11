import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Modals from '../Modal';
import normalize from 'react-native-normalize';
import {COLOR} from '../../utils/color';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import Input from '../Input';

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
  return (
    <Modals modal={modal.open} setModal={setModal}>
      <View
        style={{
          flexDirection: 'row',
          gap: normalize(80),
          alignItems: 'center',
        }}>
        <Text style={{color: COLOR.darkGrey, fontSize: normalize(20)}}>
          Alamat Sekarang
        </Text>
        <TouchableOpacity
          onPress={() => {
            setModal({...modal, open: false});
          }}>
          <FA5Icon name="times" color={'black'} size={normalize(24)} />
        </TouchableOpacity>
      </View>

      <View style={{width: '100%'}}>
        <Input
          onChange={() => {}}
          placeholder={'Cari Kecamatan/Kota'}
          value={selected?.address_friend}
          isRequired
          label="Kecamatan/Kota"
        />
      </View>
      <View
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
      </View>
    </Modals>
  );
}

const styles = StyleSheet.create({});

import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import normalize from 'react-native-normalize';
import { COLOR } from '../../utils/color';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import Car from '../../components/ui/simulation/Car';
import Motor from '../../components/ui/simulation/Motor';
import BackButton from '../../components/BackButton';

export default function Simulation({ navigation }: any) {
  const [type, setType] = useState<string>('car');

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{justifyContent:"flex-start", alignItems:"flex-start"}}>
        <BackButton navigation={navigation} />
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: normalize(40),
          flexDirection: 'row',
          gap: normalize(10),
          marginTop: normalize(20)
        }}>
        <TouchableOpacity
          onPress={() => {
            setType('car');
          }}
          style={{
            elevation: 1,
            backgroundColor: type == 'car' ? COLOR.default : 'white',
            borderWidth: type == 'car' ? 0 : 1,
            padding: normalize(10),
            width: '50%',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FA5Icon
            name="car"
            color={type == 'car' ? 'white' : COLOR.blue}
            size={normalize(50)}
          />
          <Text
            style={{
              color: type == 'car' ? 'white' : 'black',
              textAlign: 'center',
              fontSize: normalize(24),
            }}>
            Mobil
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setType('motor');
          }}
          style={{
            elevation: 1,
            backgroundColor: type == 'motor' ? COLOR.default : 'white',
            borderWidth: type == 'motor' ? 0 : 1,
            padding: normalize(10),
            width: '50%',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FA5Icon
            name="motorcycle"
            color={type == 'motor' ? 'white' : COLOR.blue}
            size={normalize(50)}
          />
          <Text
            style={{
              color: type == 'motor' ? 'white' : 'black',
              textAlign: 'center',
              fontSize: normalize(24),
            }}>
            Motor
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: 'black',
          fontSize: normalize(24),
          textAlign: 'center',
          marginTop: normalize(20),
        }}>
        Simulasi Kredit {type == 'car' ? 'Mobil' : 'Motor'}
      </Text>
      <View style={{ width: '100%', paddingHorizontal: normalize(40), marginTop: normalize(20) }}>{type == 'car' ? <Car /> : <Motor />}</View>
    </View>
  );
}

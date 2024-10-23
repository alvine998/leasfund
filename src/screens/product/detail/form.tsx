import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Input from '../../../components/Input';
import normalize from 'react-native-normalize';
import BackButton from '../../../components/BackButton';
import {COLOR} from '../../../utils/color';

export default function FormSubmission({navigation}: any) {
  const [payload, setPayload] = useState<any>();
  const heightScreen = Dimensions.get('screen').height;

  let forms = [
    {
      label: 'Nama Lengkap',
      placeholder: 'Nama Lengkap',
      value: payload?.name,
      required: true,
    },
    {
      label: 'No KTP',
      placeholder: 'No KTP',
      value: payload?.name,
      required: false,
    },
    {
      label: 'No Telepon',
      placeholder: 'No Telepon',
      value: payload?.phone,
      required: true,
    },
    {
      label: 'Nama Ibu Kandung',
      placeholder: 'Nama Ibu Kandung',
      value: payload?.birth_place,
      required: true,
    },
  ];
  return (
    <View>
      <View
        style={{
          backgroundColor: COLOR.darkGreen,
          height: normalize(100),
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingHorizontal: normalize(20),
        }}>
        <BackButton navigation={navigation} textWhite cancelText={false} />
        <Text style={styles.title}>Tambah Prospek</Text>
        <Image
          source={require('../../../assets/images/logo_icon.png')}
          style={{
            width: normalize(60),
            height: normalize(60),
            marginLeft: normalize(120),
          }}
        />
      </View>
      <ScrollView
        style={{
          paddingVertical: normalize(20),
          backgroundColor: 'white',
          height: heightScreen,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          elevation: 3,
          marginTop: normalize(10)
        }}>
        <View style={{paddingHorizontal: normalize(20)}}>
          {forms?.map((v: any, i: number) => (
            <Input
              onChange={() => {}}
              placeholder={v?.placeholder}
              value={v?.value}
              key={i}
              isRequired={v?.required}
              label={v?.label}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: normalize(20),
    marginLeft: normalize(10),
  },
});

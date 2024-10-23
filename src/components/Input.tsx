import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import {COLOR} from '../utils/color';

interface Props {
  value: any;
  placeholder: any;
  style?: any;
  onChange: any;
  number?: boolean;
  isRequired?: boolean;
  label?: string;
}

export default function Input({
  value,
  style,
  placeholder,
  onChange,
  number = false,
  isRequired = false,
  label,
}: Props) {
  return (
    <View style={{marginTop: normalize(20)}}>
      <Text
        style={{
          fontSize: normalize(18),
          color: 'black',
          marginLeft: normalize(10),
        }}>
        {label}
      </Text>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 10,
          marginTop: normalize(5),
        }}>
        <TextInput
          placeholder={placeholder + (!isRequired ? ' (Opsional)' : '')}
          value={value}
          style={[
            {
              paddingLeft: normalize(20),
              height: normalize(50),
              color: COLOR.darkGrey,
            },
            style,
          ]}
          placeholderTextColor={COLOR.darkGrey}
          onChangeText={onChange}
          keyboardType={number ? 'number-pad' : 'default'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});

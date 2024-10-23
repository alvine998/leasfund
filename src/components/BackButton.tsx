import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';

interface Props {
  navigation: any;
  textWhite?: boolean;
  cancelText?: boolean;
}

export default function BackButton({
  navigation,
  textWhite = false,
  cancelText = true,
}: Props) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          flexDirection: 'row',
          gap: normalize(10),
          alignItems: 'center',
        }}>
        <FA5Icon
          name="chevron-left"
          size={normalize(20)}
          color={textWhite ? 'white' : 'black'}
        />
        {cancelText && (
          <Text
            style={{
              fontSize: normalize(18),
              color: textWhite ? 'white' : 'black',
            }}>
            Kembali
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});

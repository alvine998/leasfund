import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import normalize from 'react-native-normalize'
import BackButton from '../../components/BackButton'
import { COLOR } from '../../utils/color'
import FA5Icon from 'react-native-vector-icons/FontAwesome5'

export default function History({ navigation }: any) {
  return (
    <View style={{ padding: normalize(20) }}>
      <BackButton navigation={navigation} />
      <Text style={{ fontSize: normalize(24), color: "black", textAlign: "center", marginTop: normalize(20) }}>Riwayat Prospek</Text>
      <ScrollView style={{ backgroundColor: "white", elevation: 5, marginTop: normalize(30), borderRadius: 10, padding: normalize(20), height: normalize(600) }}>
        <TouchableOpacity style={{ width: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between" }}>
          <View>
            <Text style={{ color: COLOR.darkGrey, fontSize: normalize(24) }}>Nanang Sumarna</Text>
            <Text style={{ color: COLOR.red, fontWeight: "bold" }}>Rp 50.000.000</Text>
          </View>
          <View>
            <FA5Icon name='car' size={normalize(50)} color={COLOR.blue} />
            <FA5Icon name='circle' size={normalize(20)} color={COLOR.yellow} style={{backgroundColor:COLOR.yellow}} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})
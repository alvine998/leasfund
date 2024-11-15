import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import normalize from 'react-native-normalize'
import BackButton from '../../components/BackButton'
import { COLOR } from '../../utils/color'
import FA5Icon from 'react-native-vector-icons/FontAwesome5'
import Input from '../../components/Input'

export default function Customer({ navigation }: any) {
  return (
    <View style={{ padding: normalize(20) }}>
      <BackButton navigation={navigation} />
      <Text style={{ fontSize: normalize(24), color: "black", textAlign: "center", marginTop: normalize(20) }}>Data Nasabah</Text>
      <Input placeholder={"Cari nasabah..."} onChange={()=>{}} value={""} isRequired />
      <ScrollView style={{ marginTop: normalize(20), marginBottom: normalize(70) }}>
        <TouchableOpacity style={{ width: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", backgroundColor: "white", elevation: 5, marginTop: normalize(10), borderRadius: 10, padding: normalize(20) }}>
          <View>
            <Text style={{ color: COLOR.darkGrey, fontSize: normalize(24) }}>Nanang Sumarna</Text>
            <Text style={{ color: COLOR.red, fontWeight: "bold" }}>Rp 50.000.000</Text>
          </View>
          <View>
            <FA5Icon name='car' size={normalize(50)} color={COLOR.blue} />
            <FA5Icon name='circle' size={normalize(20)} color={COLOR.yellow} style={{ backgroundColor: COLOR.yellow, borderRadius: 20 }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", backgroundColor: "white", elevation: 5, marginTop: normalize(10), borderRadius: 10, padding: normalize(20) }}>
          <View>
            <Text style={{ color: COLOR.darkGrey, fontSize: normalize(24) }}>Ujang Herman</Text>
            <Text style={{ color: COLOR.red, fontWeight: "bold" }}>Rp 8.000.000</Text>
          </View>
          <View>
            <FA5Icon name='motorcycle' size={normalize(50)} color={COLOR.blue} />
            <FA5Icon name='circle' size={normalize(20)} color={COLOR.default} style={{ backgroundColor: COLOR.default, borderRadius: 20 }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", backgroundColor: "white", elevation: 5, marginTop: normalize(10), borderRadius: 10, padding: normalize(20) }}>
          <View>
            <Text style={{ color: COLOR.darkGrey, fontSize: normalize(24) }}>Nanang Sumarna</Text>
            <Text style={{ color: COLOR.red, fontWeight: "bold" }}>Rp 50.000.000</Text>
          </View>
          <View>
            <FA5Icon name='car' size={normalize(50)} color={COLOR.blue} />
            <FA5Icon name='circle' size={normalize(20)} color={COLOR.red} style={{ backgroundColor: COLOR.red, borderRadius: 20 }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", backgroundColor: "white", elevation: 5, marginTop: normalize(10), borderRadius: 10, padding: normalize(20) }}>
          <View>
            <Text style={{ color: COLOR.darkGrey, fontSize: normalize(24) }}>Nanang Sumarna</Text>
            <Text style={{ color: COLOR.red, fontWeight: "bold" }}>Rp 50.000.000</Text>
          </View>
          <View>
            <FA5Icon name='car' size={normalize(50)} color={COLOR.blue} />
            <FA5Icon name='circle' size={normalize(20)} color={COLOR.default} style={{ backgroundColor: COLOR.default, borderRadius: 20 }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", backgroundColor: "white", elevation: 5, marginTop: normalize(10), borderRadius: 10, padding: normalize(20) }}>
          <View>
            <Text style={{ color: COLOR.darkGrey, fontSize: normalize(24) }}>Nanang Sumarna</Text>
            <Text style={{ color: COLOR.red, fontWeight: "bold" }}>Rp 50.000.000</Text>
          </View>
          <View>
            <FA5Icon name='car' size={normalize(50)} color={COLOR.blue} />
            <FA5Icon name='circle' size={normalize(20)} color={COLOR.gray} style={{ backgroundColor: COLOR.gray, borderRadius: 20 }} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", backgroundColor: "white", elevation: 5, marginTop: normalize(10), borderRadius: 10, padding: normalize(20) }}>
          <View>
            <Text style={{ color: COLOR.darkGrey, fontSize: normalize(24) }}>Nanang Sumarna</Text>
            <Text style={{ color: COLOR.red, fontWeight: "bold" }}>Rp 50.000.000</Text>
          </View>
          <View>
            <FA5Icon name='car' size={normalize(50)} color={COLOR.blue} />
            <FA5Icon name='circle' size={normalize(20)} color={COLOR.yellow} style={{ backgroundColor: COLOR.yellow, borderRadius: 20 }} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({})
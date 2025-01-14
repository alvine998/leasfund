import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackButton from '../../components/BackButton'
import normalize from 'react-native-normalize'
import { COLOR } from '../../utils/color'

export default function Commision({ navigation }: any) {
    return (
        <View style={{ padding: normalize(20), width: "100%", backgroundColor:"white", flex:1 }}>
            <BackButton navigation={navigation} />
            <Text style={{ marginTop: normalize(20), color: "black", textAlign: "center", fontSize: normalize(24), fontWeight: "bold" }}>Poin & Komisi</Text>
            <View style={{ flexDirection: "row", gap: normalize(20), marginTop: normalize(20), justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity style={{ backgroundColor: COLOR.blue, padding: normalize(10), borderRadius: 10, width: "45%" }}>
                    <Text style={{ color: "white", textAlign: "center", fontSize: normalize(24) }}>Poin</Text>
                    <Text style={{ color: "white", textAlign: "center", fontSize: normalize(20), fontWeight: "bold" }}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: COLOR.default, padding: normalize(10), borderRadius: 10, width: "45%" }}>
                    <Text style={{ color: "white", textAlign: "center", fontSize: normalize(24) }}>Komisi</Text>
                    <Text style={{ color: "white", textAlign: "center", fontSize: normalize(20), fontWeight: "bold" }}>Rp 0</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={()=>{
                navigation.navigate("Card")
            }} style={{marginTop: normalize(70), justifyContent:"center", alignItems:"center"}}>
                <Image source={require('../../assets/images/refer.jpg')} style={{width: normalize(300), height: normalize(350)}} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({})
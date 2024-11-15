import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import normalize from 'react-native-normalize'
import BackButton from '../../components/BackButton'
import { COLOR } from '../../utils/color'
import FA5Icon from 'react-native-vector-icons/FontAwesome5'

export default function Member({ navigation }: any) {
    const [refresh, setRefresh] = useState<boolean>(false);
    const onRefresh = () => {
        setRefresh(true);
        setTimeout(() => {
            setRefresh(false);
        }, 2000);
    };
    return (
        <View style={{ padding: normalize(20) }}>
            <BackButton navigation={navigation} />
            <Text style={{ fontSize: normalize(24), color: "black", textAlign: "center", marginTop: normalize(20) }}>Data Member</Text>
            <ScrollView refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
            }>
                <TouchableOpacity style={{ width: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", backgroundColor: "white", elevation: 5, marginTop: normalize(30), borderRadius: 10, padding: normalize(20) }}>
                    <View>
                        <Text style={{ color: COLOR.darkGrey, fontSize: normalize(24) }}>Nanang Sumarna</Text>
                        <Text style={{ color: COLOR.red, fontWeight: "bold" }}>Rp 50.000.000</Text>
                    </View>
                    <View>
                        <FA5Icon name='car' size={normalize(50)} color={COLOR.blue} />
                        <FA5Icon name='circle' size={normalize(20)} color={COLOR.yellow} style={{ backgroundColor: COLOR.yellow }} />
                    </View>
                    <View>
                        <FA5Icon name='motorcycle' size={normalize(50)} color={COLOR.blue} />
                        <FA5Icon name='circle' size={normalize(20)} color={COLOR.yellow} style={{ backgroundColor: COLOR.yellow }} />
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})
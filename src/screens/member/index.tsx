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
            <View style={{ marginTop: normalize(20), backgroundColor: "white", borderRadius: 10, padding: normalize(10), flexDirection:"row", justifyContent:"center", alignItems:"center", gap: normalize(20), elevation:3 }}>
                <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <FA5Icon name='car' size={normalize(35)} color={COLOR.darkGreen} />
                    <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>4</Text>
                </View>
                <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <FA5Icon name='motorcycle' size={normalize(35)} color={COLOR.darkGreen} />
                    <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>2</Text>
                </View>
                <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <FA5Icon name='users' size={normalize(35)} color={COLOR.darkGreen} />
                    <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>2</Text>
                </View>
            </View>
            <ScrollView style={{ marginTop: normalize(20), marginBottom: normalize(70) }} refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
            }>
                <TouchableOpacity style={{ width: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", backgroundColor: "white", marginTop: normalize(10), borderRadius: 10, padding: normalize(20) }}>
                    <View>
                        <Text style={{ color: COLOR.darkGrey, fontSize: normalize(15) }}>Nanang Sumarna</Text>
                        <Text style={{ color: COLOR.darkGrey, fontSize: normalize(15) }}>Komisi</Text>
                        <Text style={{ color: COLOR.red, fontWeight: "bold" }}>Rp 2.000.000</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: normalize(20) }}>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='car' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>4</Text>
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='motorcycle' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>2</Text>
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='users' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>2</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", backgroundColor: "white", marginTop: normalize(10), borderRadius: 10, padding: normalize(20) }}>
                    <View>
                        <Text style={{ color: COLOR.darkGrey, fontSize: normalize(15) }}>Nanang Sumarna</Text>
                        <Text style={{ color: COLOR.darkGrey, fontSize: normalize(15) }}>Komisi</Text>
                        <Text style={{ color: COLOR.red, fontWeight: "bold" }}>Rp 2.000.000</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: normalize(20) }}>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='car' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>4</Text>
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='motorcycle' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>2</Text>
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='users' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>2</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", backgroundColor: "white", marginTop: normalize(10), borderRadius: 10, padding: normalize(20) }}>
                    <View>
                        <Text style={{ color: COLOR.darkGrey, fontSize: normalize(15) }}>Nanang Sumarna</Text>
                        <Text style={{ color: COLOR.darkGrey, fontSize: normalize(15) }}>Komisi</Text>
                        <Text style={{ color: COLOR.red, fontWeight: "bold" }}>Rp 2.000.000</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: normalize(20) }}>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='car' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>4</Text>
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='motorcycle' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>2</Text>
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='users' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>2</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", backgroundColor: "white", marginTop: normalize(10), borderRadius: 10, padding: normalize(20) }}>
                    <View>
                        <Text style={{ color: COLOR.darkGrey, fontSize: normalize(15) }}>Nanang Sumarna</Text>
                        <Text style={{ color: COLOR.darkGrey, fontSize: normalize(15) }}>Komisi</Text>
                        <Text style={{ color: COLOR.red, fontWeight: "bold" }}>Rp 2.000.000</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: normalize(20) }}>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='car' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>4</Text>
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='motorcycle' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>2</Text>
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='users' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>2</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", backgroundColor: "white", marginTop: normalize(10), borderRadius: 10, padding: normalize(20) }}>
                    <View>
                        <Text style={{ color: COLOR.darkGrey, fontSize: normalize(15) }}>Nanang Sumarna</Text>
                        <Text style={{ color: COLOR.darkGrey, fontSize: normalize(15) }}>Komisi</Text>
                        <Text style={{ color: COLOR.red, fontWeight: "bold" }}>Rp 2.000.000</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: normalize(20) }}>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='car' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>4</Text>
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='motorcycle' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>2</Text>
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='users' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>2</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", backgroundColor: "white", marginTop: normalize(10), borderRadius: 10, padding: normalize(20) }}>
                    <View>
                        <Text style={{ color: COLOR.darkGrey, fontSize: normalize(15) }}>Nanang Sumarna</Text>
                        <Text style={{ color: COLOR.darkGrey, fontSize: normalize(15) }}>Komisi</Text>
                        <Text style={{ color: COLOR.red, fontWeight: "bold" }}>Rp 2.000.000</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: normalize(20) }}>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='car' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>4</Text>
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='motorcycle' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>2</Text>
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='users' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>2</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: "100%", flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", backgroundColor: "white", marginTop: normalize(10), borderRadius: 10, padding: normalize(20) }}>
                    <View>
                        <Text style={{ color: COLOR.darkGrey, fontSize: normalize(15) }}>Nanang Sumarna</Text>
                        <Text style={{ color: COLOR.darkGrey, fontSize: normalize(15) }}>Komisi</Text>
                        <Text style={{ color: COLOR.red, fontWeight: "bold" }}>Rp 2.000.000</Text>
                    </View>
                    <View style={{ flexDirection: "row", gap: normalize(20) }}>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='car' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>4</Text>
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='motorcycle' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>2</Text>
                        </View>
                        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <FA5Icon name='users' size={normalize(35)} color={COLOR.blue} />
                            <Text style={{ color: COLOR.darkGrey, fontWeight: "bold", fontSize: normalize(17) }}>2</Text>
                        </View>
                    </View>
                </TouchableOpacity>


            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import normalize from 'react-native-normalize'
import { COLOR } from '../../utils/color'
import BackButton from '../../components/BackButton'

export default function AboutUs({ navigation }: any) {
    return (
        <ScrollView style={{ padding: normalize(20) }}>
            <BackButton navigation={navigation} />
            <Text style={{ color: "black", fontWeight: "bold", fontSize: normalize(20), textAlign: "center", marginTop: normalize(20) }}>Tentang Kami</Text>
            <Text style={{ color: COLOR.darkGrey, textAlign: "justify", marginTop: normalize(10), lineHeight: normalize(25) }}>
                AGREGATOR LAYANAN PINJAMAN KEUANGAN BERBASIS TEKNOLOGI
                {`\n`}
                {`\n`}
                Leasfund sebagai platform yang memudahkan dan membandingkan layanan jasa pembiayaan pinjaman kredit dengan Teknologi.
                {`\n`}
                - Transfer biaya dimuka
                {`\n`}
                - Komisi kompetitif
                {`\n`}
                - Jaringan seluruh Indonesia
                {`\n`}
                {`\n`}
                Leasfund berdiri pada tahun 2023 dengan kantor pusat di Bandung merupakan perusahaan teknologi yang membantu pertumbuhan bisnis melalui SaaS yang inovatif dan menghubungkanklien dengan konsumen secara digital dan langsung.
            </Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
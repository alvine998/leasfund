import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import {COLOR} from '../../utils/color';
import BackButton from '../../components/BackButton';

export default function AboutUs({navigation}: any) {
  return (
    <ScrollView style={{padding: normalize(20)}}>
      <BackButton navigation={navigation} />
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: normalize(20),
          textAlign: 'center',
          marginTop: normalize(20),
        }}>
        Tentang Kami
      </Text>
      <Text
        style={{
          color: COLOR.darkGrey,
          textAlign: 'justify',
          marginTop: normalize(20),
          lineHeight: normalize(20),
          paddingBottom: normalize(40),
        }}>
        AGREGATOR LAYANAN PINJAMAN KEUANGAN BERBASIS TEKNOLOGI
        {`\n`}
        {`\n`}
        Leasfund sebagai platform yang memudahkan dan membandingkan layanan jasa
        pembiayaan pinjaman kredit dengan Teknologi.
        {`\n`}- Transfer biaya dimuka
        {`\n`}- Komisi kompetitif
        {`\n`}- Jaringan seluruh Indonesia
        {`\n`}
        {`\n`}
        Leasfund berdiri pada tahun 2023 dengan kantor pusat di Bandung
        merupakan perusahaan teknologi yang membantu pertumbuhan bisnis melalui
        SaaS yang inovatif dan menghubungkanklien dengan konsumen secara digital
        dan langsung.
        {`\n`}
        {`\n`}
        Misi Kami
        {`\n`}
        Misi utama kami adalah menghubungkan para ahli dan konsumen di seluruh
        dunia untuk meningkatkan produktivitas dan kesuksesan mereka.
        {`\n`}
        {`\n`}
        Solusi Penghasilan Tambahan
        {`\n`}
        Leasfund memberdayakan para agent untuk mendapatkan penghasilan tambahin
        demi menopang perekonomian ditengah ketidakpastian penghasilan pada
        pekerjaan tetap pasca pandemic.
        {`\n`}
        {`\n`}
        Partner Leasing
        {`\n`}- ADIRA
        {`\n`}- BFI FINANCE
        {`\n`}- MANDIRI UTAMA FINANCE
        {`\n`}- KREDITPLUS
        {`\n`}- SINARMAS
        {`\n`}- BUANA FINANCE
        {`\n`}- WOM FINANCE
        {`\n`}- MIZUHO
        {`\n`}- SMART FINANCE
        {`\n`}- MEGA FINANCE
        {`\n`}- SMS FINANCE
        {`\n`}- NSC FINANCE
        {`\n`}
        {`\n`}
        Layanan Kami
        {`\n`}
        {`\n`}
        1. Digital Leasing
        {`\n`}
        Digital leasing adalah layanan revolusioner terbaru yang menggabungkan
        kemudahan leasingonline dengan keahlian perusahaan tradisional.
        {`\n`}
        {`\n`}
        2.Personal Loan
        {`\n`}
        Menyediakan berbagai pilihan pinjaman pribadi untuk membantu Anda
        memenuhi kebutuhan keuangan.
        {`\n`}
        {`\n`}
        3. Micro Lending (Segera Hadir)
        {`\n`}
        Micro Lending atau pinjaman mikro, adalah layanan keuangan yang
        menyediakan pinjamanmodal usaha dalam Jumlah kecil kepada individu atau
        usaha mikro yang tidak memiliki akseskelayanan perbankan tradisional.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

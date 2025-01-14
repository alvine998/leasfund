import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import normalize from 'react-native-normalize';
import BackButton from '../../components/BackButton';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function FAQ({navigation}: any) {
  const [open, setOpen] = useState<any>([]);
  const faqs = [
    {
      question:
        'Apa itu Agen Leasfund & siapa yang bisa menjadi agen Dana Tunai Leasfund?',
      answer:
        'Agen Leasfund adalah program Leasfund dimana memberikan kesempatan bagi individu yang ingin mendapatkan penghasilan tambahin dengan kerja sampingan atua freelance sebagai agen Dana Tunai.',
    },
    {
      question:
        'Mengapa memilih menjadi Agen Leasfund untuk mendapatkan penghasilan tambahan?',
      answer:
        'Dengan menjadi agen Dana Tunai Leasfund kamu bisa menjadi bisnis fleksibel darimana saja dan kapan saja. Skema kerja sampingan untuk mendapat uang tambahin ini menawarkan program yang sangat menguntungkan untuk menghasilkan “CUAN”.',
    },
    {
      question:
        'Apa saja syarat yang diperlukan untuk kerja sampingan sebagai Agen Leasfund?',
      answer: `1. Usia minimal 18 Tahun ${'\n'}2. Memiliki KTP ${'\n'}3. Memiliki jaringan yang luas ${'\n'}4. Berkenan menyediakan waktu untuk training ${'\n'}5. Berkenan memberikan aplikasi calon debitur ke Leasfund`,
    },
    {
      question: 'Apa saja jenis pembiayaan yang bisa didapatkan leasing?',
      answer:
        'Dana Tunai merupakan salah satu fasilitas yang diberikan oleh Leasfund untuk solusi pinjaman dana cepat cair dengan jaminan BPKB Mobil, BPKB Motor, dan jaminan property.',
    },
    {
      question:
        'Bagaimana proses pengajuan aplikasi untuk menjalankan bisnis fleksibel tanpa modal di Agen Leasfund ?',
      answer: `1. Mendaftarkan kemitraan Agen di aplikasi Leasfund${'\n'}2. Mengakses menu “pengajuan prospek${'\n'}3. Mengisi form pengajuan dana Tunai dengan memasukan seluruh informasi konsumen
yang dibutuhkan${'\n'}4. Team sales follow up aplikasi${'\n'}5. Verifikasi leasing${'\n'}6. Pencairan Dana tunai ke konsumen${'\n'}7. Komisi kamu dapat langsung dicairkan ke rekening`,
    },
  ];
  return (
    <ScrollView style={{padding: normalize(20)}}>
      <BackButton navigation={navigation} />
      <Text
        style={{
          fontSize: normalize(20),
          color: 'black',
          fontWeight: 'bold',
          textAlign: 'center',
          marginVertical: normalize(20),
        }}>
        Tanya Jawab (FAQ)
      </Text>
      <View
        style={{
          flexDirection: 'column',
          gap: normalize(20),
          marginBottom: normalize(50),
        }}>
        {faqs?.map((v: any, i: number) => (
          <View key={i}>
            <TouchableOpacity
              onPress={() => {
                if (open?.includes(i)) {
                  return setOpen(open?.filter((val: any) => val !== i));
                }
                setOpen([...open, i]);
              }}
              style={{
                elevation: 5,
                backgroundColor: 'white',
                borderRadius: 10,
                padding: normalize(20),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: normalize(18),
                  color: 'black',
                  fontWeight: '500',
                  width: normalize(250),
                  textAlign: 'justify',
                }}>
                {v?.question}
              </Text>
              <FontAwesome5Icon
                name={open?.includes(i) ? 'chevron-up' : 'chevron-down'}
                color={'black'}
                size={normalize(20)}
              />
            </TouchableOpacity>
            {open?.includes(i) && (
              <View
                style={{
                  elevation: 5,
                  borderRadius: 10,
                  padding: normalize(20),
                  backgroundColor: 'white',
                  marginTop: normalize(10),
                }}>
                <Text
                  style={{
                    fontSize: normalize(14),
                    color: 'black',
                    lineHeight: 20
                  }}>
                  {v?.answer}
                </Text>
              </View>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

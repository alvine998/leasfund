import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import normalize from 'react-native-normalize'
import { COLOR } from '../../utils/color'
import BackButton from '../../components/BackButton'

export default function Privacy({navigation}: any) {
    return (
        <ScrollView style={{ padding: normalize(20) }}>
            <BackButton navigation={navigation} />
            <Text style={{ color: "black", fontWeight: "bold", fontSize: normalize(20), textAlign: "center", marginTop: normalize(20) }}>Kebijakan Privasi</Text>
            <Text style={{ color: COLOR.darkGrey, textAlign: "justify", marginTop: normalize(10), lineHeight: normalize(25) }}>
                1. Pengantar Leasfund berkomitmen untuk melindungi privasi Anda dan menjaga kerahasiaan informasi pribadi yang Anda berikan kepada kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda dalam penggunaan aplikasi Leasfund.
                {`\n`}
                {`\n`}
                2. Informasi yang Kami Kumpulkan Kami mengumpulkan informasi yang Anda berikan saat mendaftar, menggunakan layanan, dan berinteraksi dengan aplikasi Leasfund, seperti:
                {`\n`}
                Informasi pribadi: nama, alamat email, nomor telepon, tanggal lahir, dan data identifikasi lainnya.
                Informasi finansial: data rekening bank, nomor kartu kredit/debit, dan data transaksi.
                Informasi perangkat: jenis perangkat, alamat IP, data lokasi, dan log penggunaan aplikasi.
                3. Penggunaan Informasi Informasi yang kami kumpulkan digunakan untuk:
                {`\n`}
                {`\n`}
                Memproses dan mengelola layanan keuangan Anda.
                Memverifikasi identitas Anda dan mencegah penipuan.
                Mengembangkan dan meningkatkan aplikasi Leasfund.
                Memberikan dukungan pelanggan dan menanggapi permintaan atau keluhan Anda.
                Mengirimkan informasi penting terkait layanan, promosi, atau perubahan pada kebijakan kami.
                4. Berbagi Informasi Kami hanya akan membagikan informasi Anda dengan pihak ketiga dalam keadaan berikut:
                {`\n`}
                {`\n`}
                Untuk memproses transaksi yang melibatkan bank, lembaga keuangan, atau mitra layanan pembayaran.
                Untuk mematuhi kewajiban hukum atau peraturan.
                Dengan persetujuan Anda untuk berbagi informasi dengan pihak ketiga tertentu.
                5. Keamanan Informasi Leasfund menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data pribadi Anda dari akses tidak sah, pengungkapan, atau kehilangan. Kami juga menyarankan agar Anda menjaga kerahasiaan informasi login dan kata sandi Anda.
                {`\n`}
                {`\n`}
                6. Hak Pengguna Anda berhak untuk:
                {`\n`}
                {`\n`}
                Mengakses, memperbarui, atau menghapus informasi pribadi Anda yang ada di aplikasi Leasfund.
                Menarik persetujuan penggunaan informasi Anda, meskipun hal ini dapat memengaruhi layanan yang Anda terima.
                7. Perubahan pada Kebijakan Privasi Kami dapat memperbarui Kebijakan Privasi ini sewaktu-waktu. Setiap perubahan akan diumumkan melalui aplikasi dan mulai berlaku pada tanggal yang ditentukan.
                {`\n`}
                {`\n`}
                8. Hubungi Kami Jika Anda memiliki pertanyaan atau kekhawatiran mengenai Kebijakan Privasi ini, Anda dapat menghubungi kami melalui layanan pelanggan di dalam aplikasi Leasfund.
            </Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
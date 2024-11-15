import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import normalize from 'react-native-normalize'
import { COLOR } from '../../utils/color'
import BackButton from '../../components/BackButton'

export default function Term({ navigation }: any) {
    return (
        <ScrollView style={{ padding: normalize(20) }}>
            <BackButton navigation={navigation} />
            <Text style={{ color: "black", fontWeight: "bold", fontSize: normalize(20), textAlign: "center", marginTop: normalize(20) }}>Ketentuan Pengguna</Text>
            <Text style={{ color: COLOR.darkGrey, textAlign: "justify", marginTop: normalize(10), lineHeight: normalize(25) }}>
                1. Pengantar Syarat dan Ketentuan ini mengatur penggunaan layanan aplikasi Leasfund. Dengan mengunduh, mendaftar, dan menggunakan aplikasi Leasfund, Anda menyetujui semua syarat dan ketentuan yang tercantum. Jika Anda tidak setuju, harap berhenti menggunakan aplikasi.
                {`\n`}
                {`\n`}
                2. Penggunaan Layanan
                {`\n`}
                Registrasi: Anda diwajibkan untuk memberikan informasi yang akurat dan lengkap saat mendaftar dan bertanggung jawab atas informasi tersebut.
                Kepemilikan Akun: Setiap akun bersifat pribadi dan tidak dapat dipindah tangankan. Anda bertanggung jawab menjaga kerahasiaan data akun dan kata sandi Anda.
                Persetujuan Transaksi: Dengan menggunakan layanan ini, Anda menyetujui semua transaksi finansial yang dilakukan melalui aplikasi dan bertanggung jawab sepenuhnya atas transaksi tersebut.
                {`\n`}
                {`\n`}
                3. Kewajiban Pengguna
                {`\n`}
                Informasi yang Valid: Anda setuju untuk memberikan informasi yang benar dan akurat serta memperbarui jika ada perubahan.
                Penggunaan Sesuai Hukum: Anda dilarang menggunakan aplikasi untuk kegiatan ilegal, penipuan, atau tindakan yang dapat merugikan pihak lain atau sistem Leasfund.
                Kepatuhan terhadap Aturan: Anda setuju untuk mematuhi kebijakan, panduan, dan instruksi yang dikeluarkan Leasfund terkait penggunaan aplikasi.
                {`\n`}
                {`\n`}
                4. Keterbatasan Layanan Leasfund berhak untuk memodifikasi, menangguhkan, atau menghentikan layanan sewaktu-waktu, dengan atau tanpa pemberitahuan terlebih dahulu. Leasfund juga berhak menolak atau membatasi akses pengguna yang melanggar Syarat dan Ketentuan ini.
                {`\n`}
                {`\n`}
                5. Biaya dan Pembayaran Penggunaan beberapa fitur tertentu mungkin memerlukan pembayaran. Leasfund akan memberikan rincian biaya yang berlaku. Semua biaya dan pembayaran bersifat final dan tidak dapat dikembalikan kecuali dinyatakan lain.
                {`\n`}
                {`\n`}
                6. Hak dan Kewajiban Leasfund
                {`\n`}
                Perlindungan Data: Leasfund berkomitmen untuk melindungi privasi Anda sesuai Kebijakan Privasi yang berlaku.
                Tanggung Jawab Terbatas: Leasfund tidak bertanggung jawab atas kerugian yang timbul dari penggunaan aplikasi, kecuali jika terjadi kesalahan atau kelalaian dari pihak Leasfund.
                Penghentian Akun: Leasfund berhak menangguhkan atau menghapus akun pengguna yang melanggar ketentuan ini tanpa pemberitahuan terlebih dahulu.
                {`\n`}
                {`\n`}
                7. Penolakan Tanggung Jawab Leasfund tidak bertanggung jawab atas:
                {`\n`}
                Keterlambatan, kegagalan, atau kesalahan transaksi yang diakibatkan oleh gangguan sistem, akses internet, atau faktor di luar kendali kami.
                Kerugian akibat tindakan pengguna atau pihak ketiga yang melanggar kebijakan ini atau hukum yang berlaku.
                {`\n`}
                {`\n`}
                8. Perubahan Syarat dan Ketentuan Leasfund berhak untuk mengubah Syarat dan Ketentuan ini dari waktu ke waktu. Setiap perubahan akan diumumkan melalui aplikasi dan berlaku setelah tanggal yang ditetapkan.
                {`\n`}
                {`\n`}
                9. Hukum yang Berlaku Syarat dan Ketentuan ini diatur berdasarkan hukum yang berlaku di Indonesia. Setiap perselisihan yang timbul akan diselesaikan melalui mediasi terlebih dahulu. Jika tidak berhasil, perselisihan akan diselesaikan melalui pengadilan.
                {`\n`}
                {`\n`}
                10. Kontak Untuk pertanyaan atau keluhan terkait Syarat dan Ketentuan ini, silakan hubungi layanan pelanggan melalui aplikasi Leasfund.
            </Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})
import { View, Text, TouchableOpacity, ScrollView, Linking, RefreshControl } from 'react-native';
import React, { useState } from 'react';
import normalize from 'react-native-normalize';
import { COLOR } from '../../../utils/color';
import Modals from '../../Modal';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import TypeModal from '../../modals/TypeModal';
import TenorModal from '../../modals/TenorModal';
import LeasingModal from '../../modals/LeasingModal';
import BrandModal from '../../modals/BrandModal';
import Input from '../../Input';
import YearModal from '../../modals/YearModal';

export default function Car() {
  const [payload, setPayload] = useState<any>({
    tax_status: "on"
  })
  const [modal, setModal] = useState<{ open: boolean; data?: any; key?: string }>(
    { open: false, data: null, key: '' },
  );
  const handleChange = async (name: string, e: any) => {
    setPayload({ ...payload, [name]: e })
  }
  const leasings = ["ADIRA FINANCE", "BFI FINANCE", "WOM FINANCE", "KREDIT PLUS", "MEGA FINANCE", "DWI TUNGGAL", "BUANA FINANCE", "SINARMAS", "MIZUHO", "MANDIRI UTAMA FINANCE", "MANDIRI TUNAS FINANCE", "MNC FINANCE", "NSC", "SMART FINANCE", "TAF", "TRUE FINANCE"]
  const brands = [
    { value: "honda", label: "Honda" },
    { value: "toyota", label: "Toyota" },
    { value: "suzuki", label: "Suzuki" },
    { value: "daihatsu", label: "Daihatsu" },
    { value: "nissan", label: "Nissan" },
    { value: "kia", label: "KIA" },
    { value: "hyundai", label: "Hyundai" },
    { value: "chevrolet", label: "Chevrolet" },
    { value: "minerva", label: "Minerva" },
    { value: "piaggio", label: "Piaggio" },
    { value: "royal_enfield", label: "Royal Enfield" },
    { value: "tvs", label: "TVS" },
    { value: "vespa", label: "Vespa" },
    { value: "fiat", label: "Fiat" },
    { value: "hino", label: "Hino" },
    { value: "mitsubishi", label: "Mitsubishi" },
    { value: "isuzu", label: "Isuzu" },
    { value: "ford", label: "Ford" },
    { value: "mazda", label: "Mazda" },
    { value: "bmw", label: "BMW" },
    { value: "mercedez_benz", label: "Mercedez Benz" },
    { value: "audi", label: "Audi" },
    { value: "datsun", label: "Datsun" },
    { value: "dfsk", label: "DFSK" },
    { value: "jeep", label: "Jeep" },
    { value: "jaguar", label: "Jaguar" },
    { value: "land_rover", label: "Land Rover" },
    { value: "lexus", label: "Lexus" },
    { value: "mini", label: "Mini" },
    { value: "vw", label: "Volkswagen" },
    { value: "wuling", label: "Wuling" },
  ]
  const generateYears = (startYear: number) => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);
  };

  const years = generateYears(new Date().getFullYear() - 19);

  const sendtoWA = async () => {
    try {
      Linking.openURL(`whatsapp://send?phone=6285863953727&text=Leasing: ${payload?.leasing}%0AMerek Motor: ${payload?.brand?.toUpperCase()}%0ATipe Motor: ${payload?.type}%0ATahun: ${payload?.year}%0AStatus Pajak: ${payload?.tax_status}%0A%0ABerikan saya hitungan estimasi pencairan`)
    } catch (error) {
      console.log(error);
    }
  }
  const [refresh, setRefresh] = useState<boolean>(false);

  const onRefresh = () => {
    setRefresh(true);
    setTimeout(() => {
      setPayload({ tax_status: "on" })
      setRefresh(false);
    }, 2000);
  };

  return (
    <ScrollView refreshControl={
      <RefreshControl onRefresh={onRefresh} refreshing={refresh} />
    }>
      <View>
        <Text
          style={{
            fontSize: normalize(18),
            color: 'black',
            marginLeft: normalize(10),
            fontWeight: "bold"
          }}>
          Leasing
        </Text>
        <TouchableOpacity
          onPress={() => {
            setModal({ ...modal, open: true, key: "leasing" });
          }}
          style={{
            width: '100%',
            padding: normalize(10),
            borderRadius: 10,
            borderWidth: 1,
            paddingHorizontal: normalize(20),
            height: normalize(50),
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{ color: COLOR.darkGrey }}>
            {payload?.leasing || "Pilih Leasing"}
          </Text>
          <FA5Icon
            name="chevron-down"
            size={normalize(20)}
            color={COLOR.darkGrey}
          />
        </TouchableOpacity>
      </View>
      {
        modal.key == "leasing" &&
        <LeasingModal
          modal={modal}
          selected={payload}
          setModal={setModal}
          setSelected={setPayload}
          options={leasings}
        />
      }
      <View style={{ marginTop: normalize(20) }}>
        <Text
          style={{
            fontSize: normalize(18),
            color: 'black',
            marginLeft: normalize(10),
            fontWeight: "bold"
          }}>
          Merek Mobil
        </Text>
        <TouchableOpacity
          onPress={() => {
            setModal({ ...modal, open: true, key: "car" });
          }}
          style={{
            width: '100%',
            padding: normalize(10),
            borderRadius: 10,
            borderWidth: 1,
            paddingHorizontal: normalize(20),
            height: normalize(50),
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{ color: COLOR.darkGrey }}>
            {brands?.find((v: any) => v.value == payload?.brand)?.label || "Pilih Merek Mobil"}
          </Text>
          <FA5Icon
            name="chevron-down"
            size={normalize(20)}
            color={COLOR.darkGrey}
          />
        </TouchableOpacity>
      </View>
      {
        modal.key == "car" &&
        <BrandModal
          modal={modal}
          selected={payload}
          setModal={setModal}
          setSelected={setPayload}
          options={brands}
        />
      }
      <Input placeholder={"Masukkan Tipe Mobil"} onChange={(e: any) => handleChange("type", e)} isRequired value={payload?.type} label='Tipe Mobil' />
      <View style={{ marginTop: normalize(20) }}>
        <Text
          style={{
            fontSize: normalize(18),
            color: 'black',
            marginLeft: normalize(10),
            fontWeight: "bold"
          }}>
          Tahun
        </Text>
        <TouchableOpacity
          onPress={() => {
            setModal({ ...modal, open: true, key: "year" });
          }}
          style={{
            width: '100%',
            padding: normalize(10),
            borderRadius: 10,
            borderWidth: 1,
            paddingHorizontal: normalize(20),
            height: normalize(50),
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text style={{ color: COLOR.darkGrey }}>
            {payload?.year || "Pilih Tahun"}
          </Text>
          <FA5Icon
            name="chevron-down"
            size={normalize(20)}
            color={COLOR.darkGrey}
          />
        </TouchableOpacity>
      </View>
      {
        modal.key == "year" &&
        <YearModal
          modal={modal}
          selected={payload}
          setModal={setModal}
          setSelected={setPayload}
          options={years}
        />
      }
      <View style={{ marginTop: normalize(20) }}>
        <Text
          style={{
            fontSize: normalize(18),
            color: 'black',
            marginLeft: normalize(10),
            fontWeight: "bold"
          }}>
          Status Pajak
        </Text>
        <View style={{ flexDirection: "row", gap: normalize(20), marginTop: normalize(10), paddingHorizontal: normalize(10) }}>
          <TouchableOpacity
            onPress={() => {
              setPayload({ ...payload, tax_status: "on" })
            }}
            style={{ flexDirection: "row", gap: normalize(10) }}
          >
            <TouchableOpacity
              style={{
                width: normalize(20),
                borderRadius: 10,
                borderWidth: 1,
                height: normalize(20),
                backgroundColor: payload?.tax_status == "on" ? "black" : "white",
              }}>

            </TouchableOpacity>
            <Text style={{ color: COLOR.darkGrey }}>
              Aktif
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setPayload({ ...payload, tax_status: "off" })
            }}
            style={{ flexDirection: "row", gap: normalize(10) }}>
            <TouchableOpacity
              style={{
                width: normalize(20),
                borderRadius: 10,
                borderWidth: 1,
                height: normalize(20),
                backgroundColor: payload?.tax_status == "off" ? "black" : "white",
              }}>

            </TouchableOpacity>
            <Text style={{ color: COLOR.darkGrey }}>
              Tidak Aktif
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={sendtoWA}
        style={{
          backgroundColor: COLOR.default,
          height: normalize(50),
          width: '100%',
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: normalize(20)
        }}>
        <Text style={{ color: 'white', fontSize: normalize(20) }}>
          Hitung Sekarang
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

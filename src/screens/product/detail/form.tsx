import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Input from '../../../components/Input';
import normalize from 'react-native-normalize';
import BackButton from '../../../components/BackButton';
import {COLOR} from '../../../utils/color';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import Modals from '../../../components/Modal';
import AddressModal from '../../../components/modals/AddressModal';
import DistrictModal from '../../../components/modals/DistrictModal';
import MarritalModal from '../../../components/modals/MarritalModal';
import OccupationModal from '../../../components/modals/OccupationModal';
import HouseModal from '../../../components/modals/HouseModal';
import BpkbModal from '../../../components/modals/BpkbModal';
import TenorModal from '../../../components/modals/TenorModal';
import TaxModal from '../../../components/modals/TaxModal';
import axios from 'axios';
import {CONFIG} from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LeasingModal from '../../../components/modals/LeasingModal';
import LeasingFormModal from '../../../components/modals/LeasingFormModal';
import TypeModal from '../../../components/modals/TypeModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CoupleOccupationModal from '../../../components/modals/CoupleOccupationModal';

export default function FormSubmission({navigation}: any) {
  const [payload, setPayload] = useState<any>();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const heightScreen = Dimensions.get('screen').height;
  let steps = ['PROSPEK', 'DETAIL', 'PINJAMAN', 'DOKUMEN', 'KONFIRMASI'];
  const [step, setStep] = useState<any>(['PROSPEK']);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [modal, setModal] = useState<{open: boolean; data?: any; key?: string}>(
    {open: false, data: null, key: ''},
  );
  const [products, setProducts] = useState<any>([]);
  const [selected, setSelected] = useState<any>();
  const [walkby, setWalkby] = useState<string>('');
  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB in bytes
  const [selectImage, setSelectImage] = useState<{
    ktp: string;
    couple_ktp: string;
    acte: string;
    kk: string;
    stnk: string;
  }>({
    ktp: '',
    couple_ktp: '',
    acte: '',
    kk: '',
    stnk: '',
  });

  const uploadFirebase = async (key: string, image: any) => {
    try {
      const formData: any = new FormData();
      formData.append('file', {
        uri: image,
        name: 'image/jpg',
        type: 'image/jpeg',
      });
      const result = await axios.post(
        CONFIG.base_url_api + '/upload/image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return setSelectImage({...selectImage, [key]: result?.data?.url});
    } catch (error) {
      console.log(error);
    }
  };

  const openCamera = async (key: string) => {
    try {
      const result: any = await launchCamera({
        mediaType: 'photo',
        saveToPhotos: true,
        quality: 1,
      });
      if (result.errorCode) {
        ToastAndroid.show('Error: ' + result.errorMessage, ToastAndroid.SHORT);
      }
      if (result?.assets) {
        if (result?.assets[0]?.fileSize > MAX_FILE_SIZE) {
          return ToastAndroid.show('Maks file 2 MB', ToastAndroid.SHORT);
        }
        return uploadFirebase(key, result?.assets[0]?.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const openGallery = async (key: string) => {
    try {
      const result: any = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });
      if (result.errorCode) {
        ToastAndroid.show('Error: ' + result.errorMessage, ToastAndroid.SHORT);
      }
      if (result?.assets) {
        if (result?.assets[0]?.fileSize > MAX_FILE_SIZE) {
          return ToastAndroid.show('Maks file 2 MB', ToastAndroid.SHORT);
        }
        return uploadFirebase(key, result?.assets[0]?.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChooseOption = (key: string) => {
    Alert.alert(
      'Select Option',
      'Choose an option to get your image',
      [
        {text: 'Camera', onPress: () => openCamera(key)},
        {text: 'Gallery', onPress: () => openGallery(key)},
        {text: 'Cancel', style: 'cancel'},
      ],
      {cancelable: true},
    );
  };

  const getProduct = async () => {
    try {
      const result = await axios.get(CONFIG.base_url_api + `/product/list`, {
        headers: CONFIG.headers,
      });
      setProducts(result?.data?.items);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomer = async (
    uuid: string,
    leasing_uuid: string,
    leasing_name: string,
  ) => {
    try {
      const result = await axios.get(
        CONFIG.base_url_api + `/customer/single/${uuid}`,
        {
          headers: CONFIG.headers,
        },
      );
      setPayload({
        ...result?.data,
        leasing_uuid: leasing_uuid,
        leasing_name: leasing_name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let walkby: any = '';
    const getStorage = async () => {
      walkby = await AsyncStorage.getItem('walkby');
      let leasing: any = await AsyncStorage.getItem('leasing');
      let vtype: any = await AsyncStorage.getItem('vType');
      let user: any = await AsyncStorage.getItem('login');
      let customer: any = await AsyncStorage.getItem('continue');
      customer = JSON.parse(customer);
      setUser(JSON.parse(user));
      setWalkby(walkby);
      if (walkby == 'prospek') {
        if (customer) {
          getCustomer(
            customer?.customer_uuid,
            customer?.leasing_uuid,
            customer?.leasing_name,
          );
        }
        getProduct();
      } else {
        if (customer) {
          getCustomer(
            customer?.customer_uuid,
            customer?.leasing_uuid,
            customer?.leasing_name,
          );
        }
        leasing = JSON.parse(leasing);
        setPayload({
          ...payload,
          leasing_uuid: leasing?.uuid,
          leasing_name: leasing?.name,
          type_id: vtype,
        });
      }
    };
    getStorage();
  }, []);
  const handleChange = (name: string, e: any) => {
    setPayload({...payload, [name]: e});
  };

  let forms = [
    walkby == 'prospek' && {
      label: 'Leasing',
      placeholder: 'Pilih Leasing',
      value: payload?.leasing_name,
      required: true,
      select: true,
      name: 'leasing_uuid',
    },
    walkby == 'prospek' && {
      label: 'Jenis Kendaraan',
      placeholder: 'Pilih Jenis Kendaraan',
      value: payload?.type_name,
      required: true,
      select: true,
      name: 'type_id',
    },
    {
      label: 'Nama Lengkap Pemohon',
      placeholder: 'Nama Lengkap Pemohon',
      value: payload?.name,
      required: true,
      input: true,
      onChange: (e: any) => handleChange('name', e),
      name: 'name',
    },
    {
      label: 'NIK KTP',
      placeholder: 'Masukkan NIK 16 digit',
      value: payload?.nik,
      required: true,
      input: true,
      isNumber: true,
      onChange: (e: any) => handleChange('nik', e),
      name: 'nik',
    },
    {
      label: 'No Whatsapp',
      placeholder: '85xxxxxxxxx',
      value: payload?.phone,
      required: true,
      input: true,
      isNumber: true,
      onChange: (e: any) => handleChange('phone', e),
      name: 'phone',
    },
    {
      label: 'Nama Lengkap Ibu Kandung',
      placeholder: 'Nama Lengkap Ibu Kandung',
      value: payload?.mother_name,
      required: true,
      input: true,
      onChange: (e: any) => handleChange('mother_name', e),
      name: 'mother_name',
    },
    {
      label: 'Alamat Tinggal',
      placeholder: 'Alamat Tinggal',
      value: payload?.address_name,
      required: true,
      select: true,
      name: 'address_status',
    },
    {
      label: 'Status Pernikahan',
      placeholder: 'Status Pernikahan',
      value: payload?.marriage_name,
      required: true,
      select: true,
      name: 'marriage_status',
    },
    {
      label: 'Pekerjaan Pemohon',
      placeholder: 'Pekerjaan Pemohon',
      value: payload?.occupation_name,
      required: true,
      select: true,
      name: 'occupation_value',
    },
    {
      label: 'Status Rumah Tinggal Sekarang',
      placeholder: 'Status Rumah Tinggal Sekarang',
      value: payload?.housestatus_name,
      required: true,
      select: true,
      name: 'housestatus_value',
    },
    {
      label: 'Plat Nomor Kendaraan',
      placeholder: 'Contoh: D 1234 UAH',
      value: payload?.plat_no,
      required: true,
      input: true,
      onChange: (e: any) => handleChange('plat_no', e),
      name: 'plat_no',
    },
  ]?.filter((v: any) => v !== false);

  let forms2 = [
    {
      label: 'Nama Lengkap',
      placeholder: 'Nama Lengkap',
      value: payload?.name,
      required: true,
      input: true,
    },
    {
      label: 'No Whatsapp',
      placeholder: 'No Whatsapp',
      value: payload?.phone,
      required: true,
      input: true,
    },
    {
      label: 'Hubungan',
      placeholder: 'Hubungan',
      value: payload?.phone,
      required: true,
      input: true,
    },
    {
      label: 'Alamat Sekarang',
      placeholder: 'Alamat Sekarang',
      value: selected?.address_name,
      required: true,
      select: true,
    },
    // {
    //   label: 'Status Pemohon',
    //   placeholder: 'Status Pemohon',
    //   value: selected?.address_name,
    //   required: true,
    //   select: true,
    // },
  ]?.filter((v: any) => v !== false);

  let formsDoc = [
    {
      label: 'KTP Pemohon',
      placeholder: 'KTP Pemohon',
      key: 'ktp',
      value: payload?.name,
      required: true,
      input: true,
    },
    selected?.marrital_value == 'married' && {
      label: 'KTP Pasangan',
      placeholder: 'KTP Pasangan',
      key: 'couple_ktp',
      value: payload?.phone,
      required: true,
      input: true,
    },
    selected?.marrital_value == 'divorce' && {
      label: 'Akte Cerai',
      placeholder: 'Akte Cerai',
      key: 'acte',
      value: payload?.phone,
      required: true,
      input: true,
    },
    {
      label: 'Kartu Keluarga',
      placeholder: 'Kartu Keluarga',
      key: 'kk',
      value: payload?.phone,
      required: true,
      input: true,
    },
    {
      label: 'STNK',
      placeholder: 'STNK',
      key: 'stnk',
      value: payload?.phone,
      required: true,
      input: true,
    },
  ]?.filter((v: any) => v !== false);

  let forms3 = [
    {
      label: 'Merek Kendaraan',
      placeholder: 'Merek Kendaraan',
      value: payload?.name,
      required: true,
      input: true,
    },
    {
      label: 'Tipe Sesuai Dengan STNK',
      placeholder: 'Tipe Sesuai Dengan STNK',
      value: payload?.phone,
      required: true,
      input: true,
    },
    {
      label: 'Tahun Kendaraan',
      placeholder: 'Tahun Kendaraan',
      value: payload?.phone,
      required: true,
      input: true,
    },
    {
      label: 'BPKB Atas Nama',
      placeholder: 'BPKB Atas Nama',
      value: selected?.address_name,
      required: true,
      select: true,
    },
    {
      label: 'Nominal Pengajuan',
      placeholder: 'Nominal Pengajuan',
      value: payload?.submission_amount,
      required: true,
      input: true,
      isNumber: true,
      onChange: (e: any) => {
        const numValue = e.replace(/\D/g, '');
        setPayload({
          ...payload,
          submission_amount: new Intl.NumberFormat().format(numValue),
        });
      },
    },
    {
      label: 'Tenor',
      placeholder: 'Tenor',
      value: selected?.tenor_name,
      required: true,
      select: true,
    },
    {
      label: 'Status Pajak STNK',
      placeholder: 'Status Pajak STNK',
      value: selected?.taxstatus_name,
      required: true,
      select: true,
    },
    {
      label: 'Status Pajak Plat Nomor',
      placeholder: 'Status Pajak Plat Nomor',
      value: selected?.taxstatus_name,
      required: true,
      select: true,
    },
    {
      label: 'Kegunaan Pengajuan',
      placeholder: 'Kegunaan Pengajuan',
      value: payload?.phone,
      required: true,
      input: true,
    },
  ]?.filter((v: any) => v !== false);

  const handleStep = async (
    payload: any,
    form: any[],
    invalidData: string[],
  ) => {};

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (stepIndex == 0) {
        let invalidData: string[] = [];
        forms
          ?.filter((val: any) => val.required == true)
          ?.map((val: any) => {
            if (!payload?.[val.name]) {
              invalidData.push(val.label);
            }
          });
        if (invalidData.length > 0) {
          setLoading(false);
          ToastAndroid.show(
            `Parameter tidak lengkap ${invalidData}`,
            ToastAndroid.SHORT,
          );
          return;
        }
        if (payload?.nik?.length < 16) {
          setLoading(false);
          ToastAndroid.show(
            `NIK KTP terdiri dari 16 digit angka`,
            ToastAndroid.SHORT,
          );
          return;
        }
        if (payload?.phone?.length < 10) {
          setLoading(false);
          ToastAndroid.show(
            `No Whatsapp minimal 10 digit angka`,
            ToastAndroid.SHORT,
          );
          return;
        }
        if (payload?.address_status == 'diff_ktp') {
          if (
            !payload?.address ||
            !payload?.rt ||
            !payload?.rw ||
            !payload?.district_id
          ) {
            setLoading(false);
            ToastAndroid.show(
              `Data alamat domisili sekarang wajib diisi`,
              ToastAndroid.SHORT,
            );
            return;
          }
        }
        if (payload?.marriage_status == 'married') {
          if (
            !payload?.couple_name ||
            !payload?.couple_phone ||
            !payload?.couple_occupation_value
          ) {
            setLoading(false);
            ToastAndroid.show(`Data pasangan wajib diisi`, ToastAndroid.SHORT);
            return;
          }
        }
        const existPlatNo = await axios.get(
          CONFIG.base_url_api +
            `/transaction/list?pagination=true&page=1&limit=10&plat_no=${payload?.plat_no}`,
          {
            headers: CONFIG.headers,
          },
        );
        if (existPlatNo?.data?.items?.length > 0) {
          setLoading(false);
          ToastAndroid.show(
            `Plat No Sudah terdaftar silahkan hubungi menu bantuan!`,
            ToastAndroid.SHORT,
          );
          return;
        }
        const result = await axios.post(
          CONFIG.base_url_api + `/customer/create`,
          {
            ...payload,
            ktp_address: payload?.address_status,
            address:
              payload?.address_status == 'ktp'
                ? 'ktp'
                : `${payload?.address} RT/RW ${payload?.rt}/${payload?.rw}, ${payload?.geolocation} `,
            occupation: payload?.occupation_value,
            status: 1,
          },
          {
            headers: CONFIG.headers,
          },
        );
        if (result?.data) {
          const createPlat = await axios.post(
            CONFIG.base_url_api + `/transaction/create`,
            {
              user_uuid: user?.uuid,
              user_name: user?.name,
              customer_uuid: result?.data?.uuid,
              customer_name: result?.data?.name,
              leasing_uuid: payload?.leasing_uuid,
              leasing_name: payload?.leasing_name,
              plat_no: payload?.plat_no,
            },
            {
              headers: CONFIG.headers,
            },
          );
        }
        const newStep = stepIndex + 1;
        setStepIndex(newStep);
        setStep([...step, steps[newStep]]);
        setLoading(false);
        return;
      } else {
        const newStep = stepIndex + 1;
        setStepIndex(newStep);
        setStep([...step, steps[newStep]]);
        setLoading(false);
        return;
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1, height: heightScreen}}>
      <View
        style={{
          backgroundColor: COLOR.darkGreen,
          height: normalize(100),
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingHorizontal: normalize(20),
        }}>
        <BackButton navigation={navigation} textWhite cancelText={false} />
        <Text style={styles.title}>Tambah Prospek</Text>
        <Image
          source={require('../../../assets/images/logo_icon.png')}
          style={{
            width: normalize(60),
            height: normalize(60),
            marginLeft: normalize(120),
          }}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: normalize(10),
          paddingVertical: normalize(10),
        }}>
        {steps?.map((val: any, idx: number) => (
          <TouchableOpacity
            onPress={() => {
              // setStepIndex(idx);
              // setStep(steps[idx]);
            }}
            key={idx}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              elevation: 5,
            }}>
            <Text style={{color: COLOR.darkGreen, fontSize: normalize(12)}}>
              {val}
            </Text>
            <View
              style={{
                width: normalize(65),
                height: normalize(10),
                borderRadius: 5,
                backgroundColor: step?.includes(val)
                  ? COLOR.darkGreen
                  : 'white',
                elevation: 5,
                marginTop: normalize(5),
              }}></View>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        scrollEnabled
        style={{
          paddingVertical: normalize(20),
          backgroundColor: 'white',
          // borderTopLeftRadius: 30,
          // borderTopRightRadius: 30,
          elevation: 3,
          marginTop: normalize(10),
        }}>
        {/* PROSPEK */}
        {stepIndex == 0 && (
          <View>
            <View style={{paddingHorizontal: normalize(20)}}>
              {forms?.map((v: any, i: number) => (
                <View key={i}>
                  {v?.input && v?.name == 'phone' && (
                    <View style={{width: '100%'}}>
                      <Text
                        style={{
                          fontSize: normalize(20),
                          color: COLOR.darkGrey,
                          position: 'absolute',
                          top: normalize(56),
                          left: normalize(20),
                        }}>
                        +62
                      </Text>
                      <Input
                        onChange={v?.onChange}
                        placeholder={v?.placeholder}
                        value={v?.value}
                        isRequired={v?.required}
                        label={v?.label}
                        number={v?.isNumber}
                        maxLength={13}
                        style={{
                          width: '100%',
                          paddingLeft: normalize(60),
                          fontSize: normalize(20),
                        }}
                      />
                    </View>
                  )}
                  {v?.input && v?.name !== 'phone' && (
                    <Input
                      onChange={v?.onChange}
                      placeholder={v?.placeholder}
                      value={v?.value}
                      isRequired={v?.required}
                      label={v?.label}
                      number={v?.isNumber}
                      maxLength={v?.name == 'nik' ? 16 : 250}
                    />
                  )}
                  {v?.select && (
                    <View style={{marginTop: normalize(20)}}>
                      <Text
                        style={{
                          fontSize: normalize(18),
                          color: 'black',
                          marginLeft: normalize(10),
                          fontWeight: 'bold',
                        }}>
                        {v?.label}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setModal({...modal, open: true, key: v?.label});
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
                          marginTop: normalize(5),
                        }}>
                        <Text style={{color: COLOR.darkGrey}}>
                          {v?.value || v?.label}
                        </Text>
                        <FA5Icon
                          name="chevron-down"
                          size={normalize(20)}
                          color={COLOR.darkGrey}
                        />
                      </TouchableOpacity>

                      {payload?.address_status == 'diff_ktp' &&
                      v?.label == 'Alamat Tinggal' ? (
                        <View>
                          <Text
                            style={{
                              fontSize: normalize(18),
                              color: 'black',
                              marginLeft: normalize(10),
                              marginTop: normalize(20),
                            }}>
                            Alamat Domisili Sekarang
                          </Text>
                          <View
                            style={{
                              borderWidth: 1,
                              width: '100%',
                              borderRadius: 10,
                              padding: normalize(10),
                              paddingBottom: normalize(40),
                            }}>
                            <Input
                              placeholder={'Alamat Lengkap'}
                              value={payload?.address}
                              onChange={(e: any) => handleChange('address', e)}
                              label="Alamat Lengkap"
                            />
                            <View
                              style={{
                                flexDirection: 'row',
                                gap: normalize(10),
                              }}>
                              <View style={{width: '49%'}}>
                                <Input
                                  placeholder={'RT'}
                                  value={payload?.rt}
                                  onChange={(e: any) => handleChange('rt', e)}
                                  label="RT"
                                  number
                                  isRequired
                                />
                              </View>
                              <View style={{width: '49%'}}>
                                <Input
                                  placeholder={'RW'}
                                  value={payload?.rw}
                                  onChange={(e: any) => handleChange('rw', e)}
                                  label="RW"
                                  number
                                  isRequired
                                />
                              </View>
                            </View>
                            <View style={{marginTop: normalize(20)}}>
                              <Text
                                style={{
                                  fontSize: normalize(18),
                                  color: 'black',
                                  marginLeft: normalize(10),
                                  fontWeight:"bold"
                                }}>
                                Wilayah
                              </Text>
                              <TouchableOpacity
                                onPress={() => {
                                  setModal({
                                    ...modal,
                                    open: true,
                                    key: 'Kecamatan',
                                  });
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
                                <Text style={{color: COLOR.darkGrey, fontSize: normalize(12), width: normalize(250)}}>
                                  {payload?.geolocation || 'Pilih Wilayah'}
                                </Text>
                                <FA5Icon
                                  name="chevron-down"
                                  size={normalize(20)}
                                  color={COLOR.darkGrey}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      ) : (
                        ''
                      )}

                      {payload?.marriage_status == 'married' &&
                      v?.label == 'Status Pernikahan' ? (
                        <View>
                          <Text
                            style={{
                              fontSize: normalize(18),
                              color: 'black',
                              marginLeft: normalize(10),
                              marginTop: normalize(20),
                            }}>
                            Data Pasangan
                          </Text>
                          <View
                            style={{
                              borderWidth: 1,
                              width: '100%',
                              borderRadius: 10,
                              padding: normalize(10),
                              paddingBottom: normalize(40),
                            }}>
                            <Input
                              placeholder={'Nama Pasangan'}
                              value={payload?.couple_name}
                              onChange={(e: any) => {
                                handleChange('couple_name', e);
                              }}
                              label="Nama Pasangan"
                              isRequired
                            />
                            <Input
                              placeholder={'No Whatsapp'}
                              value={payload?.couple_phone}
                              onChange={(e: any) => {
                                handleChange('couple_phone', e);
                              }}
                              label="No Whatsapp"
                              isRequired
                            />
                            <View style={{marginTop: normalize(20)}}>
                              <Text
                                style={{
                                  fontSize: normalize(18),
                                  color: 'black',
                                  marginLeft: normalize(10),
                                }}>
                                Pekerjaan
                              </Text>
                              <TouchableOpacity
                                onPress={() => {
                                  setModal({
                                    ...modal,
                                    open: true,
                                    key: 'Pekerjaan Pasangan',
                                  });
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
                                <Text style={{color: COLOR.darkGrey}}>
                                  {payload?.couple_occupation_name ||
                                    'Pekerjaan Pasangan'}
                                </Text>
                                <FA5Icon
                                  name="chevron-down"
                                  size={normalize(20)}
                                  color={COLOR.darkGrey}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      ) : (
                        ''
                      )}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Detail */}
        {stepIndex == 1 && (
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: normalize(20),
                textAlign: 'center',
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}>
              Data Keluarga yang Tidak Serumah
            </Text>
            <View style={{paddingHorizontal: normalize(20)}}>
              {forms2?.map((v: any, i: number) => (
                <View key={i}>
                  {v?.input && (
                    <Input
                      onChange={v?.onChange}
                      placeholder={v?.placeholder}
                      value={v?.value}
                      isRequired={v?.required}
                      label={v?.label}
                      number={v?.isNumber}
                    />
                  )}
                  {v?.select && (
                    <View style={{marginTop: normalize(20)}}>
                      <Text
                        style={{
                          fontSize: normalize(18),
                          color: 'black',
                          marginLeft: normalize(10),
                        }}>
                        {v?.label}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setModal({...modal, open: true, key: v?.label});
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
                        <Text style={{color: COLOR.darkGrey}}>
                          {v?.value || v?.label}
                        </Text>
                        <FA5Icon
                          name="chevron-down"
                          size={normalize(20)}
                          color={COLOR.darkGrey}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Pinjaman */}
        {stepIndex == 2 && (
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: normalize(20),
                textAlign: 'center',
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}>
              *Data Kendaraan
            </Text>
            <View style={{paddingHorizontal: normalize(20)}}>
              {forms3?.map((v: any, i: number) => (
                <View key={i}>
                  {v?.input && (
                    <Input
                      onChange={v?.onChange}
                      placeholder={v?.placeholder}
                      value={v?.value}
                      isRequired={v?.required}
                      label={v?.label}
                      number={v?.isNumber}
                    />
                  )}
                  {v?.select && (
                    <View style={{marginTop: normalize(20)}}>
                      <Text
                        style={{
                          fontSize: normalize(18),
                          color: 'black',
                          marginLeft: normalize(10),
                        }}>
                        {v?.label}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          setModal({...modal, open: true, key: v?.label});
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
                        <Text style={{color: COLOR.darkGrey}}>
                          {v?.value || v?.label}
                        </Text>
                        <FA5Icon
                          name="chevron-down"
                          size={normalize(20)}
                          color={COLOR.darkGrey}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Dokumen */}
        {stepIndex == 3 && (
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: normalize(20),
                textAlign: 'center',
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}>
              *Data Dokumen
            </Text>
            <View style={{paddingHorizontal: normalize(20)}}>
              {formsDoc?.map((v: any, i: number) => (
                <View key={i}>
                  <TouchableOpacity
                    onPress={() => {
                      handleChooseOption(v?.key);
                    }}
                    style={{
                      width: '100%',
                      borderWidth: 1,
                      borderRadius: 10,
                      height: normalize(150),
                      marginTop: normalize(20),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <FA5Icon
                      name={v?.icon}
                      size={normalize(40)}
                      color={COLOR.darkGreen}
                    />
                    <Text
                      style={{
                        color: COLOR.darkGrey,
                        fontSize: normalize(16),
                        marginTop: normalize(10),
                      }}>
                      {v?.label}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Konfirmasi */}
        {stepIndex == 4 && (
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: normalize(20),
                textAlign: 'center',
                fontWeight: 'bold',
                fontStyle: 'italic',
              }}>
              *Tinjauan Ulang
            </Text>
            <View
              style={{
                paddingHorizontal: normalize(20),
                marginTop: normalize(20),
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 10,
                  width: '100%',
                  padding: normalize(10),
                  paddingHorizontal: normalize(20),
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: normalize(18),
                    color: COLOR.darkGrey,
                    marginLeft: normalize(10),
                  }}>
                  *Data Pemohon
                </Text>
                {forms?.map((v: any, i: number) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: normalize(10),
                    }}
                    key={i}>
                    <Text
                      style={{fontSize: normalize(15), color: COLOR.darkGrey}}>
                      {v?.label}
                    </Text>
                    <Text
                      style={{fontSize: normalize(15), color: COLOR.darkGrey}}>
                      : {v?.value}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Modal Provider */}
        {/* PROSPEK Modal */}
        {modal.key == 'Leasing' && (
          <LeasingFormModal
            options={products}
            modal={modal}
            selected={payload}
            setModal={setModal}
            setSelected={setPayload}
          />
        )}

        {modal.key == 'Jenis Kendaraan' && (
          <TypeModal
            options={[
              {value: 'car', name: 'Mobil'},
              {value: 'motor', name: 'Motor'},
            ]}
            modal={modal}
            selected={payload}
            setModal={setModal}
            setSelected={setPayload}
          />
        )}

        {modal.key == 'Alamat Tinggal' && (
          <AddressModal
            options={[
              {value: 'ktp', name: 'Sesuai KTP'},
              {value: 'diff_ktp', name: 'Beda KTP'},
            ]}
            modal={modal}
            selected={payload}
            setModal={setModal}
            setSelected={setPayload}
          />
        )}

        {modal.key == 'Status Pernikahan' && (
          <MarritalModal
            options={[
              {value: 'married', name: 'Menikah'},
              {value: 'single', name: 'Belum Menikah'},
              {value: 'divorce', name: 'Cerai'},
            ]}
            modal={modal}
            selected={payload}
            setModal={setModal}
            setSelected={setPayload}
          />
        )}

        {modal.key == 'Pekerjaan Pemohon' && (
          <OccupationModal
            options={[
              {value: 'staff', name: 'Karyawan'},
              {value: 'entrepreneur', name: 'Wirausaha'},
            ]}
            modal={modal}
            selected={payload}
            setModal={setModal}
            setSelected={setPayload}
          />
        )}

        {modal.key == 'Pekerjaan Pasangan' && (
          <CoupleOccupationModal
            options={[
              {value: 'staff', name: 'Karyawan'},
              {value: 'entrepreneur', name: 'Wirausaha'},
              {value: 'housewife', name: 'Ibu Rumah Tangga'},
            ]}
            modal={modal}
            selected={payload}
            setModal={setModal}
            setSelected={setPayload}
          />
        )}

        {modal.key == 'Status Rumah Tinggal Sekarang' && (
          <HouseModal
            options={[
              {value: 'self', name: 'Sendiri'},
              {value: 'rent', name: 'Kontrakan'},
              {value: 'mess', name: 'Mess'},
            ]}
            modal={modal}
            selected={payload}
            setModal={setModal}
            setSelected={setPayload}
          />
        )}

        {/* Detail Modal */}
        {(modal.key == 'Alamat Sekarang' || modal.key == 'Kecamatan') && (
          <DistrictModal
            modal={modal}
            selected={payload}
            setModal={setModal}
            setSelected={setPayload}
          />
        )}

        {/* Pinjaman Modal */}
        {modal.key == 'BPKB Atas Nama' && (
          <BpkbModal
            options={[
              {value: 'self', name: 'Sendiri'},
              {value: 'other', name: 'Orang Lain'},
            ]}
            modal={modal}
            selected={selected}
            setModal={setModal}
            setSelected={setSelected}
          />
        )}

        {modal.key == 'Status Pajak STNK' && (
          <TaxModal
            options={[
              {value: '1', name: 'Hidup'},
              {value: '0', name: 'Mati'},
            ]}
            title={'Status Pajak STNK'}
            modal={modal}
            selected={selected}
            setModal={setModal}
            setSelected={setSelected}
          />
        )}

        {modal.key == 'Status Pajak Plat Nomor' && (
          <TaxModal
            options={[
              {value: '1', name: 'Hidup'},
              {value: '0', name: 'Mati'},
            ]}
            title={'Status Pajak Plat Nomor'}
            modal={modal}
            selected={selected}
            setModal={setModal}
            setSelected={setSelected}
          />
        )}

        {modal.key == 'Tenor' && (
          <TenorModal
            options={[
              {value: '6', name: '6 Bulan'},
              {value: '12', name: '12 Bulan'},
              {value: '18', name: '18 Bulan'},
              {value: '24', name: '24 Bulan'},
              {value: '30', name: '30 Bulan'},
              {value: '36', name: '36 Bulan'},
              {value: '48', name: '48 Bulan'},
            ]}
            modal={modal}
            selected={selected}
            setModal={setModal}
            setSelected={setSelected}
          />
        )}
        <View
          style={{
            paddingHorizontal: normalize(20),
            marginBottom: stepIndex == 0 ? normalize(50) : normalize(0),
            marginTop: normalize(20),
          }}>
          <TouchableOpacity
            onPress={onSubmit}
            style={{
              backgroundColor: COLOR.darkGreen,
              height: normalize(50),
              width: '100%',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {loading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              <Text style={{color: 'white', fontSize: normalize(20)}}>
                {stepIndex == 3 ? 'Ajukan Pemohon' : 'Selanjutnya'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
        {stepIndex !== 0 && (
          <View
            style={{
              paddingHorizontal: normalize(20),
              marginBottom: normalize(50),
              marginTop: normalize(20),
            }}>
            <TouchableOpacity
              onPress={() => {
                const newStep = stepIndex - 1;
                setStepIndex(newStep);
                setStep(step?.filter((v: any) => v !== steps[stepIndex]));
              }}
              style={{
                backgroundColor: COLOR.red,
                height: normalize(50),
                width: '100%',
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {loading ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                <Text style={{color: 'white', fontSize: normalize(20)}}>
                  Sebelumnya
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: normalize(20),
    marginLeft: normalize(10),
  },
});

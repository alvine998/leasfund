import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
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

export default function FormSubmission({navigation}: any) {
  const [payload, setPayload] = useState<any>();
  const heightScreen = Dimensions.get('screen').height;
  let steps = ['PROSPECT', 'DETAIL', 'PINJAMAN', 'DOKUMEN', 'KONFIRMASI'];
  const [step, setStep] = useState<any>(['PROSPECT']);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [modal, setModal] = useState<{open: boolean; data?: any; key?: string}>(
    {open: false, data: null, key: ''},
  );
  const [selected, setSelected] = useState<any>();

  const handleChange = (name: string, e: any) => {
    setPayload({...payload, [name]: e});
  };

  let forms = [
    {
      label: 'Nama Lengkap Pemohon',
      placeholder: 'Nama Lengkap Pemohon',
      value: payload?.name,
      required: true,
      input: true,
      onChange: (e: any) => handleChange('name', e),
    },
    {
      label: 'NIK KTP',
      placeholder: 'NIK KTP',
      value: payload?.nik,
      required: true,
      input: true,
      isNumber: true,
      onChange: (e: any) => handleChange('nik', e),
    },
    {
      label: 'No Whatsapp',
      placeholder: 'No Whatsapp',
      value: payload?.phone,
      required: true,
      input: true,
      isNumber: true,
      onChange: (e: any) => handleChange('phone', e),
    },
    {
      label: 'Nama Lengkap Ibu Kandung',
      placeholder: 'Nama Lengkap Ibu Kandung',
      value: payload?.birth_place,
      required: true,
      input: true,
      onChange: (e: any) => handleChange('birth_place', e),
    },
    {
      label: 'Alamat Tinggal',
      placeholder: 'Alamat Tinggal',
      value: selected?.address_name,
      required: true,
      select: true,
    },
    {
      label: 'Status Pernikahan',
      placeholder: 'Status Pernikahan',
      value: selected?.marrital_name,
      required: true,
      select: true,
    },
    {
      label: 'Pekerjaan Pemohon',
      placeholder: 'Pekerjaan Pemohon',
      value: selected?.occupation_name,
      required: true,
      select: true,
    },
    {
      label: 'Status Rumah Tinggal Sekarang',
      placeholder: 'Status Rumah Tinggal Sekarang',
      value: selected?.housestatus_name,
      required: true,
      select: true,
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
      value: payload?.name,
      required: true,
      input: true,
    },
    selected?.marrital_value == 'married' && {
      label: 'KTP Pasangan',
      placeholder: 'KTP Pasangan',
      value: payload?.phone,
      required: true,
      input: true,
    },
    selected?.marrital_value == 'divorce' && {
      label: 'Akte Cerai',
      placeholder: 'Akte Cerai',
      value: payload?.phone,
      required: true,
      input: true,
    },
    {
      label: 'Kartu Keluarga',
      placeholder: 'Kartu Keluarga',
      value: payload?.phone,
      required: true,
      input: true,
    },
    {
      label: 'STNK',
      placeholder: 'STNK',
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
      label: 'Plat Nomor Kendaraan',
      placeholder: 'Plat Nomor Kendaraan',
      value: payload?.plat_no,
      required: true,
      input: true,
    },
    {
      label: 'Kegunaan Pengajuan',
      placeholder: 'Kegunaan Pengajuan',
      value: payload?.phone,
      required: true,
      input: true,
    },
  ]?.filter((v: any) => v !== false);
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
              setStepIndex(idx);
              setStep(steps[idx]);
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
        {/* Prospect */}
        {stepIndex == 0 && (
          <View>
            <View style={{paddingHorizontal: normalize(20)}}>
              {forms?.map((v: any, i: number) => (
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

                      {selected?.address_value == 'diff_ktp' &&
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
                                  value={payload?.address}
                                  onChange={(e: any) => handleChange('rt', e)}
                                  label="RT"
                                  isRequired
                                />
                              </View>
                              <View style={{width: '49%'}}>
                                <Input
                                  placeholder={'RW'}
                                  value={payload?.address}
                                  onChange={(e: any) => handleChange('rw', e)}
                                  label="RW"
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
                                }}>
                                Kecamatan
                              </Text>
                              <TouchableOpacity
                                onPress={() => {
                                  setModal({
                                    ...modal,
                                    open: true,
                                    key: 'kecamatan',
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
                                  {selected?.district_name || 'kecamatan'}
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

                      {selected?.marrital_value == 'married' &&
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
                              onChange={() => {}}
                              label="Nama Pasangan"
                              isRequired
                            />
                            <Input
                              placeholder={'No Whatsapp'}
                              value={payload?.couple_phone}
                              onChange={() => {}}
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
                                  {selected?.couple_occupation_name ||
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
        {/* Prospect Modal */}
        {modal.key == 'Alamat Tinggal' && (
          <AddressModal
            options={[
              {value: 'ktp', name: 'Sesuai KTP'},
              {value: 'diff_ktp', name: 'Beda KTP'},
            ]}
            modal={modal}
            selected={selected}
            setModal={setModal}
            setSelected={setSelected}
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
            selected={selected}
            setModal={setModal}
            setSelected={setSelected}
          />
        )}

        {modal.key == 'Pekerjaan Pemohon' && (
          <OccupationModal
            options={[
              {value: 'staff', name: 'Karyawan'},
              {value: 'entrepreneur', name: 'Wirausaha'},
            ]}
            modal={modal}
            selected={selected}
            setModal={setModal}
            setSelected={setSelected}
          />
        )}

        {modal.key == 'Pekerjaan Pasangan' && (
          <OccupationModal
            options={[
              {value: 'staff', name: 'Karyawan'},
              {value: 'entrepreneur', name: 'Wirausaha'},
              {value: 'housewife', name: 'Ibu Rumah Tangga'},
            ]}
            modal={modal}
            selected={selected}
            setModal={setModal}
            setSelected={setSelected}
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
            selected={selected}
            setModal={setModal}
            setSelected={setSelected}
          />
        )}

        {/* Detail Modal */}
        {modal.key == 'Alamat Sekarang' && (
          <DistrictModal
            modal={modal}
            selected={selected}
            setModal={setModal}
            setSelected={setSelected}
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
            marginBottom: normalize(50),
            marginTop: normalize(20),
          }}>
          <TouchableOpacity
            onPress={() => {
              const newStep = stepIndex + 1;
              setStepIndex(newStep);
              setStep([...step, steps[newStep]]);
            }}
            style={{
              backgroundColor: COLOR.darkGreen,
              height: normalize(50),
              width: '100%',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontSize: normalize(20)}}>
              {stepIndex == 3 ? 'Ajukan Pemohon' : 'Selanjutnya'}
            </Text>
          </TouchableOpacity>
        </View>
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

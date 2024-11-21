import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import Modals from '../Modal';
import normalize from 'react-native-normalize';
import { COLOR } from '../../utils/color';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';
import Input from '../Input';

interface Props {
    options: any[];
    modal: any;
    setModal: any;
    selected: any;
    setSelected: any;
}

export default function LeasingFormModal({
    options,
    modal,
    setModal,
    selected,
    setSelected,
}: Props) {
    const [data, setData] = useState<any>(options);
    const [search, setSearch] = useState<string>("")
    return (
        <Modals modal={modal.open} setModal={setModal}>
            <View
                style={{
                    flexDirection: 'row',
                    gap: normalize(80),
                    alignItems: 'center',
                }}>
                <Text style={{ color: COLOR.darkGrey, fontSize: normalize(20) }}>
                    Pilih Leasing
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        setModal({ ...modal, open: false });
                    }}>
                    <FA5Icon name="times" color={'black'} size={normalize(24)} />
                </TouchableOpacity>
            </View>
            <ScrollView
                style={{
                    height: normalize(350),
                    width: '100%',
                    marginTop: normalize(20),
                }}>
                {data?.map((v: any, i:number) => (
                    <TouchableOpacity
                        key={i}
                        onPress={() => {
                            setSelected({
                                ...selected,
                                leasing_id: v?.id,
                                leasing_name: v?.name
                            });
                            setModal({ ...modal, open: false });
                        }}
                        style={{
                            borderWidth: 1,
                            width: '100%',
                            marginTop: normalize(10),
                            borderRadius: 10,
                            paddingVertical: normalize(10),
                        }}>
                        <Text
                            style={{
                                color: 'black',
                                textAlign: 'center',
                                fontSize: normalize(18),
                            }}>
                            {v?.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </Modals>
    );
}

const styles = StyleSheet.create({});

import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import Modals from '../Modal';
  import normalize from 'react-native-normalize';
  import {COLOR} from '../../utils/color';
  import FA5Icon from 'react-native-vector-icons/FontAwesome5';
  import Input from '../Input';
  
  interface Props {
    options: any[];
    modal: any;
    setModal: any;
    selected: any;
    setSelected: any;
    title: any
  }
  
  export default function TaxModal({
    options,
    modal,
    setModal,
    selected,
    setSelected,
    title
  }: Props) {
    const [data, setData] = useState<any>(options);
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Modals modal={modal.open} setModal={setModal}>
        <View
          style={{
            flexDirection: 'row',
            gap: normalize(80),
            alignItems: 'center',
          }}>
          <Text style={{color: COLOR.darkGrey, fontSize: normalize(20)}}>
            Pilih {title || ""}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setModal({...modal, open: false});
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
          {data?.map((v: any) => (
            <TouchableOpacity
              key={v?.value}
              onPressIn={()=>{setIsHovered(true)}}
              onPressOut={()=>{setIsHovered(false)}}
              onPress={() => {
                setSelected({
                  ...selected,
                  taxstatus_value: v?.value,
                  taxstatus_name: v?.name,
                });
                setModal({...modal, open: false});
              }}
              style={{
                borderWidth: 1,
                width: '100%',
                marginTop: normalize(10),
                borderRadius: 10,
                paddingVertical: normalize(10),
                backgroundColor : isHovered ? COLOR.darkGreen : "white"
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
  
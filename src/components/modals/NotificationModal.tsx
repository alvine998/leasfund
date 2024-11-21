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
  notifications: any[];
  modal: any;
  setModal: any;
}

export default function NotificationModal({
  notifications,
  modal,
  setModal,
}: Props) {
  const [data, setData] = useState<any>(notifications);
  const [show, setShow] = useState<any>({open: false, data: null});
  return (
    <Modals modal={modal.open} setModal={setModal}>
      <View
        style={
          show?.open
            ? {
                flexDirection: 'row',
                gap: normalize(10),
                alignItems: 'baseline',
              }
            : {
                flexDirection: 'row',
                gap: normalize(80),
                alignItems: 'center',
              }
        }>
        {show.open && (
          <TouchableOpacity
            onPress={() => {
              setShow({open: false, data: null})
            }}>
            <FA5Icon name="arrow-left" color={'black'} size={normalize(24)} />
          </TouchableOpacity>
        )}
        <Text style={{color: COLOR.darkGrey, fontSize: normalize(20)}}>
          {show.open ? 'Kembali' : 'Pemberitahuan'}
        </Text>
        {!show.open && (
          <TouchableOpacity
            onPress={() => {
              setModal({...modal, open: false});
            }}>
            <FA5Icon name="times" color={'black'} size={normalize(24)} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        style={{
          height: normalize(350),
          width: '100%',
          marginTop: normalize(20),
        }}>
        {show.open ? (
          <View>
            <Text
              style={{
                color: 'black',
                fontSize: normalize(20),
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {show?.data?.title}
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: normalize(16),
                textAlign: 'justify',
                marginTop: normalize(20),
              }}>
              {show?.data?.description}
            </Text>
          </View>
        ) : (
          <View>
            {data?.map((v: any, i: number) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  setShow({open: true, data: v});
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
                  {v?.title?.substring(0, 30)}
                  {v?.title?.length > 30 ? '...' : ''}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </Modals>
  );
}

const styles = StyleSheet.create({});

import {View, Modal, StyleSheet} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';

export interface IModal {
  modal: any;
  setModal: any;
  children: any;
}

export default function Modals({modal, setModal, children}: IModal) {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal({...modal, open: false});
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>{children}</View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(22),
    paddingHorizontal: normalize(20),
    flex: 1,
  },
  modalView: {
    margin: normalize(20),
    backgroundColor: 'white',
    borderRadius: 20,
    padding: normalize(35),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    opacity: 30,
  },
});

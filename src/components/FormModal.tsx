import React from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {COLORS} from '../config';

type FormModalProps = {
  visible?: boolean;
  onClose: () => void;
  children?: any;
};

const FormModal: React.FC<FormModalProps> = ({children, onClose, visible}) => (
  <Modal
    visible={visible}
    onRequestClose={onClose}
    animationType="fade"
    transparent={true}
    statusBarTranslucent={true}>
    <TouchableOpacity activeOpacity={1} style={[styles.container]}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Icon name="close" size={30} color="black" style={styles.image} />
        </TouchableOpacity>
        {children}
      </View>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 170 : 200,
    height: '100%',
    width: '100%',
  },
  modalContent: {
    backgroundColor: COLORS.bkg,
    borderTopEndRadius: 22,
    borderTopStartRadius: 22,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.title,
    height: '100%',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default FormModal;

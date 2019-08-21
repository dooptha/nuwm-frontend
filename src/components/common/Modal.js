import React from 'react';
import { View } from 'react-native';
import {
  withStyles,
} from 'react-native-ui-kitten';
import Modal from 'react-native-modal';

const ModalComponent = ({
  visible,
  themedStyle,
  onBackdropPress,
  children,
}) => (
  <Modal
    isVisible={visible}
    onBackdropPress={onBackdropPress}
  >
    <View style={themedStyle.container}>
      <View style={themedStyle.box}>
        {children}
      </View>
    </View>
  </Modal>
);

export default withStyles(ModalComponent, (theme) => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: theme['background-basic-color-1'],
    borderRadius: 20,
    padding: 20,
  },
}));

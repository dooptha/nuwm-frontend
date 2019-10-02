import React from 'react';
import { SafeAreaView } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';

DeviceInfo.hasNotch()
  .then((hasNotch) => SafeAreaView.setStatusBarHeight(hasNotch ? 40 : 20));

const CustomSafeAreaView = (props) => (
  <SafeAreaView
    {...props}
  />
);

export default CustomSafeAreaView;

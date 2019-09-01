import React from 'react';
import { SafeAreaView as SafeAreaViewReactNavigation } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';

if (DeviceInfo.hasNotch()) {
  SafeAreaViewReactNavigation.setStatusBarHeight(20);
} else {
  SafeAreaViewReactNavigation.setStatusBarHeight(0);
}

const SafeAreaView = (props) => (
  <SafeAreaViewReactNavigation
    {...props}
  />
);

export default SafeAreaView;

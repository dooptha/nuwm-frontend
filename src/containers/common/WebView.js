import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';

const style = StyleSheet.create({
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ({ navigation }) => {
  const renderIndicator = () => <ActivityIndicator size="large" style={style.loader} />;
  const uri = navigation.getParam('url', null);

  if (!uri) {
    navigation.goBack();
  }

  return (
    <WebView
      source={{ uri }}
      renderLoading={renderIndicator}
      allowsBackForwardNavigationGestures
      startInLoadingState
    />
  );
};

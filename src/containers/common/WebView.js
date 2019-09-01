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
  const url = navigation.getParam('url', null);

  if (!url) {
    navigation.goBack();
  }

  return (
    <WebView
      source={{ url }}
      renderLoading={renderIndicator}
      allowsBackForwardNavigationGestures
      startInLoadingState
    />
  );
};

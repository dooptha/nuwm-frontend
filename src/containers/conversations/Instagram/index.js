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

export default () => (
  <WebView
    allowsBackForwardNavigationGestures
    source={{ uri: 'https://www.instagram.com/explore/tags/воднік/?hl=uk' }}
    startInLoadingState
    renderLoading={() => <ActivityIndicator size="large" style = {style.loader} />}
  />
);

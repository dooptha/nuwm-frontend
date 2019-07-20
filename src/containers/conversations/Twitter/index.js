import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';
import html from './data';

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
    originWhitelist={['*']}
    allowsBackForwardNavigationGestures
    startInLoadingState
    renderLoading={() => <ActivityIndicator size="large" style = {style.loader} />}
    source={{ uri: 'https://twitter.com/search?q=%23воднік&src=typd' }}
  />
);

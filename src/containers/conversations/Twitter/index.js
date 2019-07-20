import React from 'react';
import { WebView } from 'react-native-webview';
import html from './data';

export default () => (
  <WebView
    originWhitelist={['*']}
    allowsBackForwardNavigationGestures
    source={{ html }}
  />
);

import React from 'react';
import { WebView } from 'react-native-webview';
import html from './data';

export default () => (
  <WebView
    allowsBackForwardNavigationGestures
    source={{ uri: 'https://www.instagram.com/explore/tags/воднік/?hl=uk'  }}
  />
);

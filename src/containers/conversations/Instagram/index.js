import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { WebView } from 'react-native-webview';
import config from '../../../../config';

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

export default () => {
  const renderIndicator = () => <ActivityIndicator size="large" style={style.loader} />;
  const uri = `https://www.instagram.com/explore/tags/${config.INSTAGRAM_HASHTAG}/?hl=uk`;

  return (
    <WebView
      source={{ uri }}
      renderLoading={renderIndicator}
      allowsBackForwardNavigationGestures
      startInLoadingState
    />
  );
};

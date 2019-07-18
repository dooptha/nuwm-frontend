import React from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

export class RemoteIcon {
  constructor(source) {
    this.source = source;
  }

  imageSource() {
    return { uri: this.source };
  }
}

export const Icon = (source, style) => (
  <Image
    style={style}
    source={source.imageSource}
  />
);

const fancyIconStyle = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});

export const FancyIcon = (source, color = 'red') => (
  <View style={{ ...fancyIconStyle.container, ...{ backgroundColor: color } }}>
    {Icon(source, fancyIconStyle.icon)}
  </View>
);

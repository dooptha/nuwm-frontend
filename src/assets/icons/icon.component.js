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

const style = StyleSheet.create({
  fancyContainer: {
    width: 30,
    height: 30,
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});

export const CircleIcon = (source, color = 'red') => (
  <View style={{ ...style.circleContainer, ...{ backgroundColor: color } }}>
    {Icon(source, style.circleIcon)}
  </View>
);

export const FancyIcon = (source, color = 'red') => (
  <View style={{ ...style.fancyContainer, ...{ backgroundColor: color } }}>
    {Icon(source, style.icon)}
  </View>
);

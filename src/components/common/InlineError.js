import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const style = StyleSheet.create({
  container: {
    backgroundColor: '#FF3566',
    paddingVertical: 3,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  text: {
    color: 'white',
  },
});

export default ({ error }) => (
  error ? (
    <View style={style.container}>
      <Text style={style.text}>
        {error.message}
      </Text>
    </View>
  ) : null
);

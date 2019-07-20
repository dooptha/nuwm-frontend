import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import {
  withStyles,
  Text,
} from 'react-native-ui-kitten';

const InstagramCard = ({
  onPress,
  themedStyle,
}) => (
  <TouchableOpacity
    style={themedStyle.container}
    onPress={onPress}
  >
    <Text style={themedStyle.title} category="h1">Instagram #воднік</Text>
  </TouchableOpacity>
);

export default withStyles(InstagramCard, () => ({
  container: {
    padding: 20,
    backgroundColor: '#D42A76',
    borderRadius: 20,
    overflow: 'hidden',
  },
  title: {
    color: 'white',
  },
}));

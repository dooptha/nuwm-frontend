import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import {
  withStyles,
  Text,
} from 'react-native-ui-kitten';

const TwitterCard = ({
  onPress,
  themedStyle,
}) => (
  <TouchableOpacity
    style={themedStyle.container}
    onPress={onPress}
  >
    <Text style={themedStyle.title} category="h1">Tweets liked by pihol</Text>
  </TouchableOpacity>
);

export default withStyles(TwitterCard, () => ({
  container: {
    padding: 20,
    backgroundColor: '#1DA1F2',
    borderRadius: 20,
    overflow: 'hidden',
  },
  title: {
    color: 'white',
  },
}));

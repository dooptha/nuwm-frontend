import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import {
  withStyles,
  Text,
} from 'react-native-ui-kitten';
import { TwitterIcon } from '../../../assets/icons';
import config from '../../../../config';

const SquareTwitterCard = ({
  onPress,
  themedStyle,
}) => (
  <TouchableOpacity
    style={themedStyle.container}
    onPress={onPress}
  >
    {TwitterIcon(themedStyle.icon)}
    <Text style={themedStyle.title} category="h3">
      #
      {config.TWITTER_HASHTAG}
    </Text>
  </TouchableOpacity>
);

export default withStyles(SquareTwitterCard, () => ({
  container: {
    padding: 20,
    backgroundColor: '#1DA1F2',
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
  },
  title: {
    color: 'white',
  },
  icon: {
    width: 50,
    height: 50,
    tintColor: 'white',
    marginRight: 10,
  },
}));

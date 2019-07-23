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

const TwitterCard = ({
  onPress,
  themedStyle,
}) => (
  <TouchableOpacity
    style={themedStyle.container}
    onPress={onPress}
  >
    {TwitterIcon(themedStyle.icon)}
    <Text style={themedStyle.title} category="h6">
      #
      {config.TWITTER_HASHTAG}
    </Text>
  </TouchableOpacity>
);

export default withStyles(TwitterCard, () => ({
  container: {
    paddingVertical: 20,
    backgroundColor: '#1DA1F2',
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'white',
    marginRight: 5,
  },
}));

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
    <Text style={themedStyle.title} category="h1">
      #
      {config.TWITTER_HASHTAG}
    </Text>
  </TouchableOpacity>
);

export default withStyles(TwitterCard, () => ({
  container: {
    paddingVertical: 40,
    paddingRight: 40,
    paddingLeft: 25,
    backgroundColor: '#1DA1F2',
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontFamily: 'Roboto',
  },
  icon: {
    width: 50,
    height: 50,
    tintColor: 'white',
    marginRight: 10,
  },
}));

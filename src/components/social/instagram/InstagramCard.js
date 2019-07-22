import React from 'react';
import {
  TouchableOpacity,
} from 'react-native';
import {
  withStyles,
  Text,
} from 'react-native-ui-kitten';
import { InstagramIcon } from '../../../assets/icons';
import config from '../../../utils/config';

const InstagramCard = ({
  onPress,
  themedStyle,
}) => (
  <TouchableOpacity
    style={themedStyle.container}
    onPress={onPress}
  >
    {InstagramIcon(themedStyle.icon)}

    <Text style={themedStyle.title} category="h1">
      #
      {config.INSTAGRAM_HASHTAG}
    </Text>
  </TouchableOpacity>
);

export default withStyles(InstagramCard, () => ({
  container: {
    paddingVertical: 40,
    paddingRight: 40,
    paddingLeft: 25,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#D42A76',
    flexDirection: 'row',
    alignItems: 'center',
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

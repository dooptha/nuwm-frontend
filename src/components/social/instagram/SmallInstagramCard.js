import React from 'react';
import {
  TouchableOpacity,
  View,
} from 'react-native';
import {
  withStyles,
  Text,
} from 'react-native-ui-kitten';

import LinearGradient from 'react-native-linear-gradient';
import { InstagramIcon } from '../../../assets/icons';
import config from '../../../../config';

const SmallInstagramCard = ({
  onPress,
  themedStyle,
}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
  >
    <LinearGradient
      style={themedStyle.box}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#8838A9', '#E5364F']}
    >
      <View style={themedStyle.container}>
        {InstagramIcon(themedStyle.icon)}

        <Text style={themedStyle.title} category="h6">
          #
          {config.INSTAGRAM_HASHTAG}
        </Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

export default withStyles(SmallInstagramCard, () => ({
  box: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  container: {
    paddingVertical: 20,
    borderRadius: 20,
    overflow: 'hidden',
    // backgroundColor: '#D42A76',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontFamily: 'Roboto',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'white',
    marginRight: 5,
  },
}));

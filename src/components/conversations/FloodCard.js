import React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Avatar,
  Text,
  withStyles,
} from 'react-native-ui-kitten';
import I18n from '../../utils/i18n';
import { FloodImage } from '../../assets/images';
import { ArrowForwardOutline } from '../../assets/icons';

const FloodCard = ({
  themedStyle,
  navigateToChat,
  onlineCount,
}) => (
  <View style={themedStyle.floodContainer}>
    <View style={themedStyle.offset} />
    <View style={themedStyle.avatarContainer}>
      <Avatar
        style={themedStyle.avatar}
        source={FloodImage.imageSource}
        shape="rounded"
      />
      <View style={themedStyle.textContainer}>
        <View style={themedStyle.onlineCounterContainer}>
          <View style={themedStyle.onlineCircle}>
            <Text style={themedStyle.onlineCircleText}>{onlineCount}</Text>
          </View>
          <Text style={themedStyle.onlineCounterText}>{I18n.t('flood.online')}</Text>
        </View>
        <Text category="h3">{I18n.t('flood.title')}</Text>
        <Text
          category="p1"
          style={themedStyle.floodDescription}
        >
          {I18n.t('flood.description')}
        </Text>
      </View>
    </View>

    <View
      style={themedStyle.arrowContainer}
    >
      <TouchableOpacity onPress={navigateToChat}>
        {ArrowForwardOutline(themedStyle.arrow)}
      </TouchableOpacity>
    </View>
  </View>
);

export default withStyles(FloodCard, (theme) => ({
  floodContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: theme['background-basic-color-1'],
  },
  offset: {
    flex: 1,
  },
  avatarContainer: {
    flex: 4,
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
  },
  textContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    paddingBottom: 20,
  },
  floodDescription: {
    paddingTop: 10,
  },
  arrowContainer: {
    flex: 1,
    width: 56,
    height: 56,
  },
  arrow: {
    width: 40,
    height: 40,
    tintColor: 'grey',
  },
  onlineCounterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  onlineCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineCircleText: {
    color: 'white',
  },
  onlineCounterText: {
    paddingLeft: 5,
  },
}));

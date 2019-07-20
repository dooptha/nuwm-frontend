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
import { ArrowForwardOutline, PeopleIcon } from '../../assets/icons';

const FloodCard = ({
  themedStyle,
  navigateToChat,
  onlineCount,
}) => (
  <TouchableOpacity onPress={navigateToChat}>
    <View style={themedStyle.floodContainer}>
      <View style={themedStyle.offset} />
      <View style={themedStyle.avatarContainer}>
        <Avatar
          style={themedStyle.avatar}
          source={FloodImage.imageSource}
          shape="rounded"
        />
        <View style={themedStyle.textContainer}>
          <View style={themedStyle.onlineContainer}>
            <Text style={themedStyle.onlineText}>{onlineCount}</Text>
            {PeopleIcon(themedStyle.onlineIcon)}
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
        {ArrowForwardOutline(themedStyle.arrow)}
      </View>
    </View>
  </TouchableOpacity>
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
  onlineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  // onlineCircle: {
  //   width: 20,
  //   height: 20,
  //   borderRadius: 10,
  //   backgroundColor: theme['color-success-700'],
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  onlineText: {
    color: theme['text-disabled-color'],
  },
  onlineIcon: {
    width: 20,
    height: 20,
    tintColor: theme['text-disabled-color'],
  },
}));

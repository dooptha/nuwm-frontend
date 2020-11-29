import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Text,
  withStyles,
} from 'react-native-ui-kitten';
import I18n from '../../utils/i18n';
import { FloodImage } from '../../assets/images';
import { PeopleIcon } from '../../assets/icons';

const SquareFloodCard = ({
  themedStyle,
  navigateToChat,
  onlineCounter,
  unreadCounter,
}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={navigateToChat}
    style={themedStyle.container}
  >
    {
      unreadCounter > 0 ? (
        <View style={themedStyle.badgeContainer}>
          <Text style={themedStyle.badgeTitle}>{unreadCounter}</Text>
        </View>
      ) : null
    }
    <View style={themedStyle.textContainer}>
      <View style={themedStyle.titleContainer}>
        <Text
          style={themedStyle.text}
          category="h3"
        >
          {I18n.t('flood.title')}
        </Text>
        <View style={themedStyle.onlineContainer}>
          <Text style={themedStyle.onlineText}>{onlineCounter}</Text>
          {PeopleIcon(themedStyle.onlineIcon)}
        </View>
      </View>
      <Text
        style={[themedStyle.floodDescription, themedStyle.text]}
        category="p1"
      >
        {I18n.t('flood.description')}
      </Text>
    </View>
  </TouchableOpacity>
);

export default withStyles(SquareFloodCard, (theme) => ({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  floodContainer: {
    alignItems: 'center',
    backgroundColor: theme['background-basic-color-1'],
  },
  textContainer: {
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  floodDescription: {
    color: theme['text-hint-color'],
  },
  onlineContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    marginLeft: 10,
  },
  onlineText: {
    color: theme['text-hint-color'],
  },
  onlineIcon: {
    width: 20,
    height: 20,
    tintColor: theme['text-hint-color'],
  },
  text: {
    fontFamily: 'Roboto',
  },
  badgeContainer: {
    backgroundColor: '#FF3566',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 10,
    top: 10,
  },
  badgeTitle: {
    color: 'white',
    fontSize: 18,
  },
}));

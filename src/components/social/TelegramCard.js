import React from 'react';
import {
  TouchableOpacity,
  View,
} from 'react-native';
import {
  withStyles,
  Text,
} from 'react-native-ui-kitten';
import { PeopleIcon, TelegramIcon } from '../../assets/icons';

const TelegramCard = ({
  count = 0,
  onPress,
  themedStyle,
}) => (
  <TouchableOpacity
    style={themedStyle.container}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={themedStyle.content}>
      <Text style={themedStyle.title} category="h4">
        ЧАТ ТЕЛЕГРАМ
      </Text>
      <View style={themedStyle.online}>
        {PeopleIcon(themedStyle.onlineIcon)}
        <Text style={themedStyle.title} category="s2">
          {count} людей
        </Text>
      </View>
    </View>
    <View style={themedStyle.iconContainer}>
      {TelegramIcon(themedStyle.icon)}
    </View>
  </TouchableOpacity>
);

export default withStyles(TelegramCard, (theme) => ({
  container: {
    marginTop: 16,
    paddingHorizontal: 36,
    paddingVertical: 24,
    borderRadius: 16,
    backgroundColor: '#33AAEB',
    height: 160,
    flexDirection: 'row',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
  },
  icon: {
    width: 84,
    height: 84,
    tintColor: 'white',
  },
  content: {
    maxWidth: '60%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    color: 'white',
    fontFamily: 'Roboto',
  },
  column: {
    flex: 1,
  },
  online: {
    borderRadius: 16,
    backgroundColor: '#34bafe',
    paddingHorizontal: 16,
    paddingVertical: 4,
    flexDirection: 'row',
  },
  onlineIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
    marginRight: 4,
  },
}));

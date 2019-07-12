import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Avatar,
  Text,
  withStyles,
} from 'react-native-ui-kitten';
import { routes } from './data';
import { useGlobalState } from '../../../utils/context';
import I18n from '../../../utils/i18n';
import { FloodImage } from '../../../assets/images';
import ArrowImage from '../../../assets/icons/eva/arrow-forward-outline.png';

const ConversationsContainer = ({ navigation, themedStyle }) => {
  const [context] = useGlobalState();

  const { routeName, params } = routes[0];
  const { onlineCount } = context;

  const natigateToChat = () => {
    navigation.navigate({
      key: 'ConversationsContainer',
      routeName,
      params,
    });
  };

  return (
    <View style={themedStyle.container}>
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
          onPress={natigateToChat}
        >
          <TouchableOpacity onPress={natigateToChat}>
            <Image
              source={ArrowImage}
              style={themedStyle.arrow}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


export default withStyles(ConversationsContainer, (theme) => ({
  container: {
    paddingTop: 20,
    backgroundColor: theme['background-basic-color-2'],
    flex: 1,
  },
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

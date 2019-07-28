import React from 'react';
import {
  View,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  withStyles,
  Text,
  List,
  ListItem,
  Avatar,
} from 'react-native-ui-kitten';
import { DoopthaImage } from '../../../assets/images';
import data from './data';
import config from '../../../../config';
import I18n from '../../../utils/i18n';

const ContactUs = ({ themedStyle }) => {
  const openURL = (url) => {
    Linking.openURL(url);
  };

  const confirmExit = (title, url) => {
    Alert.alert(
      I18n.t(title),
      I18n.t('contactUs.alert'),
      [
        {
          text: I18n.t('contactUs.open'),
          onPress: () => openURL(url),
        },
        {
          text: I18n.t('contactUs.cancel'),
          style: 'cancel',
        },
      ],
    );
  };

  const renderItem = ({ item }) => (
    <ListItem
      titleStyle={themedStyle.text}
      descriptionStyle={themedStyle.text}
      title={I18n.t(item.title)}
      description={I18n.t(item.description)}
      onPress={() => confirmExit(item.title, item.url)}
      icon={item.icon}
    />
  );

  return (
    <View style={themedStyle.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => confirmExit('contactUs.title', config.WEBSITE_URL)}
      >
        <View style={themedStyle.avatarContainer}>
          <Avatar
            style={themedStyle.avatar}
            source={DoopthaImage.imageSource}
            shape="square"
          />
          <Text
            style={themedStyle.text}
            category="h2"
          >
            {I18n.t('contactUs.title')}
          </Text>
        </View>
      </TouchableOpacity>
      <List
        style={themedStyle.list}
        data={data}
        renderItem={renderItem}
        scrollEnabled={false}
      />
      <Text
        style={[themedStyle.version, themedStyle.text]}
        category="s1"
      >
        NUWMApp v1.0.0
      </Text>
    </View>
  );
};

export default withStyles(ContactUs, (theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-1'],
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  version: {
    textAlign: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    tintColor: theme['text-basic-color'],
  },
  list: {
    backgroundColor: theme['background-basic-color-1'],
  },
  text: {
    fontFamily: 'Roboto',
  },
}));

import React from 'react';
import {
  View,
  Linking,
  TouchableOpacity,
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
import config from '../../../utils/config';
import I18n from '../../../utils/i18n';

const ContactUs = ({ themedStyle }) => {
  const openURL = (url) => {
    Linking.openURL(url);
  };

  const renderItem = ({ item }) => (
    <ListItem
      title={I18n.t(item.title)}
      description={I18n.t(item.description)}
      onPress={() => openURL(item.url)}
      icon={item.icon}
    />
  );

  return (
    <View style={themedStyle.container}>
      <TouchableOpacity onPress={() => openURL(config.WEBSITE_URL)}>
        <View style={themedStyle.avatarContainer}>
          <Avatar
            style={themedStyle.avatar}
            source={DoopthaImage.imageSource}
            shape="square"
          />
          <Text category="h2">{I18n.t('contactUs.title')}</Text>
        </View>
      </TouchableOpacity>
      <List
        style={themedStyle.list}
        data={data}
        renderItem={renderItem}
        scrollEnabled={false}
      />
      <Text
        style={themedStyle.version}
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
  },
  list: {
    backgroundColor: theme['background-basic-color-1'],
  },
}));

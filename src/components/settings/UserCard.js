import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Avatar,
  ListItem,
  Text,
} from 'react-native-ui-kitten';
import { ArrowForwardOutline } from '../../assets/icons';
import { DefaultUserImage } from '../../assets/images';

const style = StyleSheet.create({
  listItem: {
    justifyContent: 'space-between',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginTop: 10,
    marginBottom: 10,
  },
  group: {
    color: 'grey',
  },
  userInfo: {
    paddingLeft: 20,
  },
  arrow: {
    tintColor: 'grey',
    height: 24,
    width: 24,
  },
  text: {
    fontFamily: 'Roboto',
  },
});

export default ({ user, onItemSelect }) => (
  <ListItem
    style={style.listItem}
    onPress={() => onItemSelect()}
  >
    <View style={style.contentContainer}>
      <Avatar
        style={style.avatar}
        source={DefaultUserImage.imageSource}
        shape="round"
        size="giant"
      />
      <View style={style.userInfo}>
        <Text
          category="s1"
          style={style.text}
        >
          {user.name}
        </Text>
      </View>
    </View>
    {ArrowForwardOutline(style.arrow)}
  </ListItem>
);

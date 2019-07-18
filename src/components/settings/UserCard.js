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
  name: {
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
  }
});

export default ({ user, onItemSelect }) => (
  <ListItem
    style={style.listItem}
    onPress={() => onItemSelect()}
  >
    <View style={style.contentContainer}>
      <Avatar
        style={style.avatar}
        source={user.image}
        shape="round"
        size="giant"
      />
      <View style={style.userInfo}>
        <Text
          category="s1"
          style={style.name}
        >
          {user.name}
        </Text>
        <Text
          category="p1"
          style={style.group}
        >
          {user.group}
        </Text>
      </View>
    </View>
    {ArrowForwardOutline(style.arrow)}
  </ListItem>
);

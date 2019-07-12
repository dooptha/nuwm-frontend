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

const style = StyleSheet.create({
  listItem: {
    justifyContent: 'flex-start',
  },
  avatar: {
    marginTop: 10,
    marginBottom: 10,
  },
  name: {
  },
  email: {
    color: 'grey',
  },
  userInfo: {
    paddingLeft: 20,
  },
});

export default ({ user, onItemSelect }) => (
  <ListItem
    style={style.listItem}
    onPress={() => onItemSelect()}
  >
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
        style={style.email}
      >
        {user.email}
      </Text>
    </View>
  </ListItem>
);

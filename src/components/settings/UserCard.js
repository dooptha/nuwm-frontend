import React from 'react';
import {
  View,
  Image,
} from 'react-native';
import {
  ListItem,
  Text,
  withStyles,
} from 'react-native-ui-kitten';
import { ArrowForwardOutline } from '../../assets/icons';
import { DefaultUserImage } from '../../assets/images';

const UserCard = ({ user, onItemSelect, themedStyle }) => (
  <ListItem
    style={themedStyle.listItem}
    onPress={() => onItemSelect()}
  >
    <View style={themedStyle.contentContainer}>
      <Image
        style={themedStyle.avatar}
        source={DefaultUserImage.imageSource}
      />
      <View style={themedStyle.userInfo}>
        <Text
          category="s1"
          style={themedStyle.text}
        >
          {user.username}
        </Text>
      </View>
    </View>
    {ArrowForwardOutline(themedStyle.arrow)}
  </ListItem>
);

export default withStyles(UserCard, (theme) => ({
  listItem: {
    justifyContent: 'space-between',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 75,
    height: 75,
    tintColor: theme['text-basic-color'],
  },
  group: {
    color: 'grey',
  },
  userInfo: {
    paddingLeft: 10,
  },
  arrow: {
    tintColor: 'grey',
    height: 24,
    width: 24,
  },
  text: {
    fontFamily: 'Roboto',
  },
}));

import React from 'react';
import { Text, withStyles } from 'react-native-ui-kitten';
import { Image, View, TouchableOpacity } from 'react-native';
import { formatDate } from '../../utils/string';

const EventListItem = ({ themedStyle, item, handlePress }) => (
  <TouchableOpacity
    style={themedStyle.container}
    activeOpacity={0.5}
    onPress={handlePress}
  >
    {
      item.image && (
        <Image
          style={themedStyle.image}
          source={{ uri: item.image }}
        />
      )
    }
    <View style={themedStyle.content}>
      <Text>{item.title}</Text>
      <View style={themedStyle.meta}>
        <Text style={themedStyle.metaText}>{item.signature}</Text>
        <Text style={themedStyle.metaText}>{formatDate(item.createdAt)}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default withStyles(EventListItem, (theme) => ({
  container: {
    margin: 16,
    backgroundColor: theme['background-basic-color-1'],
    borderRadius: 16,
    shadowColor: '#6c6c6c',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  content: {
    margin: 32,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  metaText: {
    color: theme['text-hint-color'],
  },
  image: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
    height: 180,
  },
}));

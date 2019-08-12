import React from 'react';
import {
  Dimensions,
  View,
} from 'react-native';
import {
  withStyles,
  Text,
} from 'react-native-ui-kitten';
import { getSenderColor } from '../../utils/colors';

const MessageComponent = ({ message, themedStyle }) => {
  const alignmentStyle = { justifyContent: 'flex-start' };
  const textColor = {
    color: getSenderColor(message.sender.username, themedStyle.textTheme.color, 0.7),
  };

  return (
    <View style={[themedStyle.messageContainer, alignmentStyle]}>
      <View style={[themedStyle.triangle, themedStyle.triangleLeft]} />
      <View style={themedStyle.cloudContainer} key={1}>
        <View style={[themedStyle.cloud, themedStyle.cloudRight]}>
          <Text
            style={[themedStyle.sender, themedStyle.text, textColor]}
            category="c1"
          >
            {message.sender.username}
          </Text>
          <Text
            style={themedStyle.text}
            category="p1"
          >
            {message.body}
          </Text>
        </View>
      </View>
      <Text
        style={themedStyle.text}
        key={0}
        appearance="hint"
        category="c1"
      >
        {message.date}
      </Text>
    </View>
  );
};

export default withStyles(MessageComponent, (theme) => ({
  triangle: {
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    backgroundColor: 'transparent',
  },
  triangleLeft: {
    transform: [{ rotate: '-90deg' }],
    borderBottomColor: theme['background-basic-color-1'],
  },
  cloudContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cloud: {
    padding: 16,
    paddingTop: 8,
    borderRadius: 20,
    maxWidth: Dimensions.get('window').width - 120,
  },
  cloudRight: {
    right: 3,
    backgroundColor: theme['background-basic-color-1'],
    marginRight: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sender: {
    textAlign: 'left',
    color: theme['text-disabled-color'],
  },
  text: {
    fontFamily: 'Roboto',
  },
  textTheme: {
    color: theme['text-basic-color'],
  },
}));

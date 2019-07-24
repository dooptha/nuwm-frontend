import React from 'react';
import {
  Dimensions,
  View,
} from 'react-native';
import {
  withStyles,
  Text,
} from 'react-native-ui-kitten';

const MessageComponent = ({ message, themedStyle }) => {
  const alignmentStyle = { justifyContent: message.isSender ? 'flex-end' : 'flex-start' };

  return (
    <View style={[themedStyle.messageContainer, alignmentStyle]}>
      <View style={[themedStyle.triangle, themedStyle.triangleLeft]} />
      <View style={themedStyle.cloudContainer} key={1}>
        <View style={[themedStyle.cloud, themedStyle.cloudRight]}>
          <Text style={themedStyle.sender} category="c1">{message.sender}</Text>
          <Text category="p1">{message.body}</Text>
        </View>
      </View>
      <Text
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
    borderRadius: 16,
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
}));

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
  const alignmentStyle = { justifyContent: message.sender ? 'flex-end' : 'flex-start' };

  return (
    <View style={[themedStyle.messageContainer, alignmentStyle]}>
      <Text
        key={0}
        appearance="hint"
        category="c1"
      >
        {message.date}
      </Text>
      <View style={themedStyle.cloudContainer} key={1}>
        <View style={[themedStyle.cloud, themedStyle.cloudRight]}>
          <Text>{message.body}</Text>
        </View>
        <View style={[themedStyle.triangle, themedStyle.triangleRight]} />
      </View>
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
    transform: [{ rotate: '90deg' }],
    borderBottomColor: theme['background-basic-color-1'],
  },
  cloudContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cloud: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    maxWidth: Dimensions.get('window').width - 120,
  },
  cloudRight: {
    left: 3,
    backgroundColor: theme['background-basic-color-1'],
    marginLeft: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

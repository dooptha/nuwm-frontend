import React from 'react';
import { View } from 'react-native';
import {
  withStyles,
} from 'react-native-ui-kitten';
import RightMessage from './RightMessage';
import LeftMessage from './LeftMessage';

const MessageComponent = ({ message, themedStyle }) => {
  const alignmentStyle = { justifyContent: message.isSender ? 'flex-end' : 'flex-start' };

  return (
    <View style={[themedStyle.messageContainer, alignmentStyle]}>
      {message.isSender
        ? <RightMessage message={message} />
        : <LeftMessage message={message} />
      }
    </View>
  );
};

export default withStyles(MessageComponent, () => ({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
}));

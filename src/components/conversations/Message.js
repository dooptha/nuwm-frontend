import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  withStyles,
} from 'react-native-ui-kitten';
import moment from 'moment';
import RightMessage from './RightMessage';
import LeftMessage from './LeftMessage';

const MessageComponent = ({
  message,
  themedStyle,
  onPress,
  current,
}) => {
  if (!message.sender) return null;

  const isSender = message.sender.id === current._id || message.isSender;
  const alignmentStyle = { justifyContent: isSender ? 'flex-end' : 'flex-start' };
  const date = moment(message.date).format('HH:mm');

  return (
    <TouchableWithoutFeedback
      onPress={() => onPress(message)}
    >
      <View
        style={[themedStyle.messageContainer, alignmentStyle]}
      >
        { isSender
          ? <RightMessage message={{ ...message, date }} />
          : <LeftMessage message={{ ...message, date }} />
        }
      </View>
    </TouchableWithoutFeedback>
  );
};

export default withStyles(MessageComponent, () => ({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
}));

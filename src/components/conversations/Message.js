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

const MessageComponent = ({ message, themedStyle, onPress }) => {
  const alignmentStyle = { justifyContent: message.isSender ? 'flex-end' : 'flex-start' };
  const date = moment(message.date).format('HH:mm');

  return (
    <TouchableWithoutFeedback
      onPress={() => onPress(message)}
    >
      <View
        style={[themedStyle.messageContainer, alignmentStyle]}
      >
        {message.isSender
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

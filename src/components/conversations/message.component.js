import React, { Component } from 'react';
import { View } from 'react-native';
import {
  withStyles,
  Text
} from 'react-native-ui-kitten';
import { RightMessage } from './right_message.component';
import { LeftMessage } from './left_message.component';

class MessageComponent extends Component {
  render() {
    const {  message, themedStyle } = this.props;
    const alignmentStyle = {justifyContent: message.sender? 'flex-end':'flex-start'};

    return(
      <View style={[themedStyle.messageContainer, alignmentStyle]}>
      {message.sender?
        <RightMessage message={message}/> :
        <LeftMessage message={message}/>
      }
      </View>
    );
  }
}

export const Message = withStyles(MessageComponent, (theme) => ({
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  }
}));

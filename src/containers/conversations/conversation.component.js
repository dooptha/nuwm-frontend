import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { withStyles, Input } from 'react-native-ui-kitten';
import { Conversation as Chat } from '../../components/conversations';
import { AvoidKeyboard } from '../../components/common';

const ConversationComponent = (props) => {
  const { themedStyle, data, onItemSelect } = props;
  let newMessage = '';

  const keyboardOffset = (height) => {
    return Platform.select({
      ios: height,
      android: 0,
    });
  };

  return (
    <AvoidKeyboard
      style={themedStyle.container}
      autoDismiss={false}
      offset={keyboardOffset}>
        <Chat
          renderItem={this.renderMessage}
          contentContainerStyle={themedStyle.chatContainer}
          data={data}
          onItemSelect={(i) => onItemSelect(i)}
        />
        <View style={themedStyle.inputContainer}>
          <Input
            style={themedStyle.messageInput}
            value={newMessage}
            placeholder='Message...'
          />
        </View>
    </AvoidKeyboard>
  );
};

export const Conversation = withStyles(ConversationComponent, (theme) => ({
  container: {
    flex: 1,
  },
  chatContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  message: {
    marginVertical: 12,
  },
  inputContainer: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme['background-basic-color-2'],
  },
  addMessageButton: {
    width: 26,
    height: 26,
    borderRadius: 26,
  },
  messageInput: {
    flex: 1,
    marginHorizontal: 8,
  },
}));

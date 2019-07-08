import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { withStyles, Input, Button } from 'react-native-ui-kitten';
import { Conversation as Chat } from '../../components/conversations';
import { AvoidKeyboard } from '../../components/common';
import {
  PaperPlaneIconFill,
} from '../../assets/icons';

const ConversationComponent = (props) => {
  const { themedStyle, data, onItemSelect, newMessage, onNewMessageChange } = props;

  const keyboardOffset = (height) => {
    return Platform.select({
      ios: height,
      android: 0,
    });
  };

  const renderSendMessageButton = () => {
  return (
    <Button
      style={themedStyle.addMessageButton}
      appearance='ghost'
      size='large'
      icon={PaperPlaneIconFill}
      onPress={() => console.log('add message')}
    />
  );
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
            onChangeText={(m) => onNewMessageChange(m)}
          />
          {renderSendMessageButton()}
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
    backgroundColor: theme['background-basic-color-1'],
  },
}));

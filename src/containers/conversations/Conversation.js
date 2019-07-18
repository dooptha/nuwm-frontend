import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { withStyles, Input, Button } from 'react-native-ui-kitten';
import { Conversation as Chat } from '../../components/conversations';
import { AvoidKeyboard } from '../../components/common';
import {
  PaperPlaneIconFill,
} from '../../assets/icons';

import { StateContext } from '../../utils/context';
import { socket } from '../../api/socket';

class ConversationContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMessage: '',
    };

    this.onNewMessageChange = this.onNewMessageChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  onNewMessageChange(newMessage) {
    this.setState({
      newMessage,
    });
  }

  sendMessage() {
    const { newMessage } = this.state;

    if (newMessage === '') return false;

    const message = {
      body: newMessage,
      date: '13:00',
      sender: true,
    };

    const [, dispatch] = this.context;
    dispatch({
      type: 'sendMessage',
      message,
    });

    socket.emit('message:send', { message });

    this.setState({ newMessage: '' });

    return true;
  }

  keyboardOffset(height) {
    return Platform.select({
      ios: height,
      android: 0,
    });
  }

  renderSendMessageButton() {
    const { themedStyle } = this.props;

    return (
      <Button
        style={themedStyle.addMessageButton}
        appearance="ghost"
        size="large"
        icon={PaperPlaneIconFill}
        onPress={this.sendMessage}
      />
    );
  }

  render() {
    const { newMessage } = this.state;
    const [{ conversations }] = this.context;
    const { themedStyle } = this.props;

    return (
      <AvoidKeyboard
        style={themedStyle.container}
        autoDismiss={false}
        offset={this.keyboardOffset}
      >
        <Chat
          contentContainerStyle={themedStyle.chatContainer}
          data={conversations.messages}
        />
        <View style={themedStyle.inputContainer}>
          <Input
            style={themedStyle.messageInput}
            value={newMessage}
            placeholder="Message..."
            onChangeText={this.onNewMessageChange}
          />
          {this.renderSendMessageButton()}
        </View>
      </AvoidKeyboard>
    );
  }
}

ConversationContainer.contextType = StateContext;

export default withStyles(ConversationContainer, (theme) => ({
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

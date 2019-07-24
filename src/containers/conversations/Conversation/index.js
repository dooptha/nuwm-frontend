import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { withStyles, Input, Button } from 'react-native-ui-kitten';
import { Conversation as Chat } from '../../../components/conversations';
import { AvoidKeyboard } from '../../../components/common';
import {
  PaperPlaneIconFill,
} from '../../../assets/icons';
import { StateContext } from '../../../utils/context';
import I18n from '../../../utils/i18n';

class Conversation extends Component {
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
      date: new Date(),
      isSender: true,
    };

    const [{ app, user }, dispatch] = this.context;
    dispatch({
      type: 'sendMessage',
      message,
    });

    app.socket.emit('message:send', {
      body: newMessage,
      sender: user.current.name,
    });

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
    const { newMessage } = this.state;

    return (
      <Button
        style={themedStyle.addMessageButton}
        size="small"
        icon={PaperPlaneIconFill}
        onPress={this.sendMessage}
        disabled={newMessage === ''}
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
          style={themedStyle.chatContainer}
          data={conversations.messages}
        />
        <View style={themedStyle.inputContainer}>
          <Input
            style={themedStyle.messageInput}
            size="small"
            value={newMessage}
            placeholder={I18n.t('conversations.messagePlaceholder')}
            onChangeText={this.onNewMessageChange}
          />
          {this.renderSendMessageButton()}
        </View>
      </AvoidKeyboard>
    );
  }
}

Conversation.contextType = StateContext;

export default withStyles(Conversation, (theme) => ({
  container: {
    flex: 1,
  },
  chatContainer: {
    paddingHorizontal: 16,
    backgroundColor: theme['background-basic-color-3'],
  },
  inputContainer: {
    padding: 5,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme['background-basic-color-2'],
  },
  addMessageButton: {
    alignItems: 'center',
    width: 24,
    height: 24,
    borderRadius: 24,
    marginBottom: 2,
  },
  messageInput: {
    flex: 1,
    marginRight: 5,
    backgroundColor: theme['background-basic-color-1'],
    borderRadius: 24,
  },
}));

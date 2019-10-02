import React, { Component } from 'react';
import {
  View,
  Platform,
} from 'react-native';
import { withStyles, Input, Button } from 'react-native-ui-kitten';
import { Conversation as Chat } from '../../../components/conversations';
import { AvoidKeyboard } from '../../../components/common';
import {
  PaperPlaneIconFill,
} from '../../../assets/icons';
import { StateContext } from '../../../utils/context';
import I18n from '../../../utils/i18n';
import socket from '../../../api/socket';
import config from '../../../../config';
import SafeAreaView from '../../../navigation/components/SafeAreaView';

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.state = { newMessage: '' };
    this.chatRef = React.createRef();
    this.onNewMessageChange = this.onNewMessageChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const [, dispatch] = this.context;
    dispatch({ type: 'readMessages' });
  }

  onNewMessageChange(newMessage) {
    this.setState({
      newMessage,
    });
  }

  sendMessage() {
    const { newMessage } = this.state;
    const [{ user }, dispatch] = this.context;
    const { _id, username, role } = user.current;

    if (newMessage.length < 1 || newMessage.length > config.MAXIMUM_CHARS_IN_MESSAGE) return false;

    const message = {
      body: newMessage,
      date: new Date(),
      sender: {
        id: _id,
        username,
        role,
      },
    };

    dispatch({
      type: 'sendMessage',
      message,
    });

    socket.emit('message:send', message);
    this.setState({ newMessage: '' });
    this.chatRef.current.scrollToLastMessage();
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
        icon={() => PaperPlaneIconFill(themedStyle.addMessageButtonIcon)}
        onPress={this.sendMessage}
        disabled={newMessage.length < 1 || newMessage.length > config.MAXIMUM_CHARS_IN_MESSAGE}
      />
    );
  }

  render() {
    const { newMessage } = this.state;
    const [{ conversations, user }] = this.context;
    const { themedStyle } = this.props;
    const forceInset = {
      top: 'never',
      bottom: 'always',
    };

    return (
      <SafeAreaView
        forceInset={forceInset}
        style={themedStyle.container}
      >
        <AvoidKeyboard
          style={themedStyle.avoidKeyboard}
          autoDismiss={false}
          offset={this.keyboardOffset}
        >
          <Chat
            ref={this.chatRef}
            style={themedStyle.chatContainer}
            data={conversations.messages.slice()
              .reverse()}
            current={user.current}
          />
          <View style={themedStyle.inputContainer}>
            <Input
              style={themedStyle.messageInput}
              size="small"
              multiline
              value={newMessage}
              placeholder={I18n.t('conversations.messagePlaceholder')}
              onChangeText={this.onNewMessageChange}
            />
            {this.renderSendMessageButton()}
          </View>
        </AvoidKeyboard>
      </SafeAreaView>
    );
  }
}

Conversation.contextType = StateContext;

export default withStyles(Conversation, (theme) => ({
  avoidKeyboard: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: theme['background-basic-color-2'],
  },
  chatContainer: {
    paddingHorizontal: 5,
    backgroundColor: theme['background-basic-color-3'],
  },
  inputContainer: {
    padding: 5,
    paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: theme['background-basic-color-2'],
  },
  addMessageButton: {
    alignItems: 'center',
    width: 24,
    height: 24,
    borderRadius: 24,
    marginBottom: 8,
  },
  messageInput: {
    flex: 1,
    marginRight: 5,
    backgroundColor: theme['background-basic-color-1'],
    borderRadius: 24,
  },
}));

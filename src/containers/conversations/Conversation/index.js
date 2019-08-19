import React, { Component } from 'react';
import {
  View,
  Alert,
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
import api from '../../../api/user';
import socket from '../../../api/socket';
import config from '../../../../config';

class Conversation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMessage: '',
    };

    this.onNewMessageChange = this.onNewMessageChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.onMessagePress = this.onMessagePress.bind(this);
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

  onMessagePress(message) {
    const [{ user }] = this.context;
    const { role } = user.current;

    if (role === 'admin' || role === 'moderator') {
      Alert.alert(
        I18n.t('admin.deleteMessage'),
        message.body,
        [
          {
            text: I18n.t('admin.yes'),
            onPress: () => this.deleteMessage(message),
          },
          {
            text: I18n.t('admin.no'),
            style: 'cancel',
          },
        ],
      );
    }
  }

  deleteMessage(message) {
    api.deleteMessage(message);
  }

  sendMessage() {
    const { newMessage } = this.state;
    const [{ user }, dispatch] = this.context;

    if (newMessage.length < 1 || newMessage.length > config.MAXIMUM_CHARS_IN_MESSAGE) return false;

    const message = {
      body: newMessage,
      date: new Date(),
      sender: {
        id: user.current._id,
        username: user.current.username,
      },
    };

    dispatch({
      type: 'sendMessage',
      message,
    });

    socket.emit('message:send', message);

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

    return (
      <AvoidKeyboard
        style={themedStyle.avoidKeyboard}
        autoDismiss={false}
        offset={this.keyboardOffset}
      >
        <Chat
          style={themedStyle.chatContainer}
          data={conversations.messages}
          onMessagePress={this.onMessagePress}
          current={user.current}
        />
        <View style={themedStyle.inputContainer}>
          <Input
            style={themedStyle.messageInput}
            textStyle={themedStyle.text}
            size="small"
            multiline
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
  avoidKeyboard: {
    flex: 1,
  },
  container: {
    flex: 1,
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
  addMessageButtonIcon: {
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
  text: {
    fontFamily: 'Roboto',
  },
}));

import React, { Component } from 'react';
import {
  List,
} from 'react-native-ui-kitten';
import Message from './Message';

class Conversation extends Component {
  constructor(props) {
    super(props);

    this.listRef = React.createRef();
    this.scrollToLastMessageTimeout = null;
  }

  componentWillUnmount() {
    if (this.scrollToLastMessageTimeout) {
      clearTimeout(this.scrollToLastMessageTimeout);
    }
  }

  onListContentSizeChange() {
    this.scrollToLastMessageTimeout = setTimeout(() => this.scrollToLastMessage(), 0);
  }

  scrollToLastMessage() {
    this.listRef.current.scrollToEnd({ animated: false });
  }

  renderListItem(info) {
    const { onMessagePress, current, data } = this.props;
    const message = info.item;

    if (!message) return null;

    const prevMessage = data[info.index - 1];
    const nextMessage = data[info.index + 1];
    const prevSender = prevMessage && (message.sender.id === prevMessage.sender.id);
    const nextSender = nextMessage && (message.sender.id === nextMessage.sender.id);
    let messagePosition = 'solo';

    if (nextSender) {
      if (prevSender) {
        messagePosition = 'middle';
      } else {
        messagePosition = 'first';
      }
    } else if (prevSender) {
      messagePosition = 'last';
    }

    return (
      <Message
        index={message.id}
        message={message}
        onMessagePress={onMessagePress}
        current={current}
        messagePosition={messagePosition}
      />
    );
  }

  render() {
    const { data, style } = this.props;

    return (
      <List
        style={style}
        ref={this.listRef}
        onContentSizeChange={() => this.onListContentSizeChange()}
        data={data}
        renderItem={(info) => this.renderListItem(info)}
      />
    );
  }
}

export default Conversation;

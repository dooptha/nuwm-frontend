import React, { Component } from 'react';
import { List } from 'react-native-ui-kitten';
import Message from './Message';

class Conversation extends Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
    this.renderItem = this.renderItem.bind(this);
  }

  scrollToLastMessage() {
    this.listRef.current.scrollToIndex({
      index: 0,
      animated: false,
    });
  }

  renderItem({ item, index }) {
    if (!item) return null;

    const { current, data } = this.props;
    const prevMessage = data[index + 1];
    const nextMessage = data[index - 1];
    const prevSender = prevMessage && (item.sender.id === prevMessage.sender.id);
    const nextSender = nextMessage && (item.sender.id === nextMessage.sender.id);
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
        index={item.id}
        message={item}
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
        data={data}
        renderItem={this.renderItem}
        inverted
      />
    );
  }
}

export default Conversation;

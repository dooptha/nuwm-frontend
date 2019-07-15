import React, { Component } from 'react';
import {
  List,
  ListItem,
} from 'react-native-ui-kitten';
import Message from './Message';

class Conversation extends Component {
  constructor(props) {
    super(props);

    this.data = props.data;
    this.listRef = React.createRef();
    this.scrollToLastMessageTimeout = null;

    this.renderItem = (info) => (
      <ListItem
        title={info.item.body}
        onPress={(i) => props.onItemSelect(i)}
      />
    );
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
    this.listRef.current.scrollToEnd({ animated: true });
  }

  renderMessage(info) {
    return (
      <Message
        index={info.index}
        message={info.item}
      />
    );
  }

  render() {
    return (
      <List
        ref={this.listRef}
        onContentSizeChange={() => this.onListContentSizeChange()}
        data={this.data}
        renderItem={(info) => this.renderMessage(info)}
      />
    );
  }
}

export default Conversation;

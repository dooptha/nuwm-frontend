import React, { Component } from 'react';
import {
  List,
} from 'react-native-ui-kitten';
import Message from './Message';

class Conversation extends Component {
  constructor(props) {
    super(props);

    this.data = props.data;
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
    this.listRef.current.scrollToEnd({ animated: true });
  }

  renderListItem(info) {
    const { onMessagePress, current } = this.props;

    return (
      <Message
        index={info.index}
        message={info.item}
        onPress={(m) => onMessagePress(m)}
        current={current}
      />
    );
  }

  render() {
    const { style } = this.props;

    return (
      <List
        style={style}
        ref={this.listRef}
        onContentSizeChange={() => this.onListContentSizeChange()}
        data={this.data}
        renderItem={(info) => this.renderListItem(info)}
      />
    );
  }
}

export default Conversation;

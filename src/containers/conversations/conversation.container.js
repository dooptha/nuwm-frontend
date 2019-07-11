import React, {
  Component,
} from 'react';
import {
  Conversation,
} from './conversation.component';
import { storeData } from '../../utils/storage';
import { StateContext } from '../../utils/context';
import { socket } from '../../api/socket';

class ConversationContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMessage: '',
    };
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

  render() {
    const { newMessage } = this.state;
    const [context] = this.context;

    return (
      <Conversation
        data={context.messages}
        onNewMessageChange={(m) => this.onNewMessageChange(m)}
        newMessage={newMessage}
        sendMessage={() => this.sendMessage()}
      />
    );
  }
}

ConversationContainer.contextType = StateContext;
export default ConversationContainer;

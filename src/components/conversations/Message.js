import React from 'react';
import RightMessage from './RightMessage';
import LeftMessage from './LeftMessage';

const Message = (props) => {
  const {
    current,
    message,
  } = props;

  if (!message || !message.sender) return null;

  const isSender = message.sender.id === current._id || message.isSender;

  return (
    isSender
      ? <RightMessage {...props} />
      : <LeftMessage {...props} />
  );
};

export default Message;

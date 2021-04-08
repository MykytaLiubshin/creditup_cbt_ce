import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.css';

const Messages = ({ messages, name }) => {
  console.log(messages);
  messages = messages.filter(
    e => e.message !== undefined && e.display === true,
  );
  return (
    <ScrollToBottom className="messages" followButtonClassName="hide">
      {messages.map((message, i) => {
        let m = {
          text: message.message,
          user: message.name,
        };
        return (
          <div key={i}>
            <Message message={m} name={name} />
          </div>
        );
      })}
    </ScrollToBottom>
  );
};

export default Messages;

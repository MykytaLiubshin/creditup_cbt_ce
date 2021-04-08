import React from "react";

import "./Message.css";

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;
  let emojified = text;
  let checker = "http";

  if (user === name) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{name}</p>
      <div className="messageBox backgroundBlue">
        {emojified[0].indexOf(checker) !== -1 ? (
          <a href={emojified} className="messageText colorWhite link">
            {emojified}
          </a>
        ) : (
          <p className="messageText colorWhite">{emojified}</p>
        )}
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        {emojified[0].indexOf(checker) !== -1 ? (
          <a href={emojified} className="messageText colorDark link">
            {emojified}
          </a>
        ) : (
          <p className="messageText colorDark">{emojified}</p>
        )}
      </div>
      <p className="sentText pl-10 ">{user}</p>
    </div>
  );
};

export default Message;

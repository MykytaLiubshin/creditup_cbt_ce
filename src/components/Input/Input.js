import React from "react";

import "./Input.css";
import send from "../../icons/send.svg";

const Input = ({ setMessage, sendMessage, message, isManager = false }) => (
  <form className={!isManager ? "form" : "formManager"}>
    <input
      className={!isManager ? "input" : "inputManager"}
      type="text"
      placeholder="Введите ваше сообщение..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
    <button
      className={!isManager ? "sendButton" : "sendButtonManager"}
      onClick={(e) => sendMessage(e)}
    >
      <img src={send} className={!isManager ? "send" : "sendManager"} />
    </button>
  </form>
);

export default Input;

import React from "react";

import "./Input.css";
import send from "../../icons/send.svg";

const Input = ({ setMessage, sendMessage, message, isManager = false }) => (
  <form className="form">
    <input
      className="input"
      type="text"
      placeholder="Введите ваше сообщение..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={(event) =>
        event.key === "Enter" ? sendMessage(event) : null
      }
    />
  </form>
);

export default Input;
